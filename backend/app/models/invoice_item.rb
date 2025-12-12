# frozen_string_literal: true

class InvoiceItem < ApplicationRecord
  belongs_to :invoice

  validates :description, presence: true
  validates :quantity, numericality: true, allow_nil: true
  validates :unit_price, numericality: true, allow_nil: true

  def calculate_totals
    qty = quantity || 0
    price = unit_price || 0
    self.line_subtotal = (qty.to_d * price.to_d).to_i
    tax_rate = tax_category == "taxable_10" ? 0.1 : 0
    self.line_tax = (line_subtotal * tax_rate).round
    self.line_total = line_subtotal + line_tax
  end
end
