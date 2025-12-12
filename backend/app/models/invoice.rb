# frozen_string_literal: true

class Invoice < ApplicationRecord
  STATUSES = %w[draft issued sent paid canceled].freeze

  belongs_to :customer
  has_many :invoice_items, -> { order(:position) }, dependent: :destroy

  validates :invoice_number, presence: true, uniqueness: true
  validates :customer, :title, :invoice_date, :due_date, presence: true
  validates :status, inclusion: { in: STATUSES }
  validates :billing_name, :billing_postal_code, :billing_address, :billing_tel, :billing_person_in_charge, presence: true

  before_validation :assign_billing_snapshot, on: :create
  before_validation :assign_invoice_number, on: :create
  before_save :apply_item_totals
  before_save :recalculate_totals

  accepts_nested_attributes_for :invoice_items

  private

  def assign_billing_snapshot
    return unless customer

    self.billing_name ||= customer.name
    self.billing_postal_code ||= customer.postal_code
    self.billing_address ||= customer.address
    self.billing_tel ||= customer.tel
    self.billing_person_in_charge ||= customer.person_in_charge
  end

  def assign_invoice_number
    return if invoice_number.present? || invoice_date.blank?

    period = invoice_date.strftime("%Y%m")
    sequence = Invoice.where("invoice_number LIKE ?", "INV-#{period}-%").count + 1
    self.invoice_number = format("INV-%<period>s-%<seq>04d", period: period, seq: sequence)
  end

  def apply_item_totals
    invoice_items.each_with_index do |item, idx|
      item.position ||= idx + 1
      item.calculate_totals
    end
  end

  def recalculate_totals
    self.subtotal_amount = invoice_items.sum(&:line_subtotal)
    self.tax_amount = invoice_items.sum(&:line_tax)
    self.total_amount = invoice_items.sum(&:line_total)
  end
end
