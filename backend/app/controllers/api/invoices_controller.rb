# frozen_string_literal: true

module Api
  class InvoicesController < ApplicationController
    before_action :set_invoice, only: %i[show update]

    def index
      invoices = Invoice.includes(:customer, :invoice_items).order(invoice_date: :desc)
      render json: invoices.as_json(include: [:invoice_items, :customer])
    end

    def show
      render json: @invoice.as_json(include: [:invoice_items, :customer])
    end

    def create
      invoice = Invoice.new(invoice_params)
      assign_items(invoice)
      if invoice.save
        render json: invoice.as_json(include: [:invoice_items, :customer]), status: :created
      else
        render json: { errors: invoice.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      @invoice.assign_attributes(invoice_params)
      @invoice.invoice_items.destroy_all
      assign_items(@invoice)
      if @invoice.save
        render json: @invoice.as_json(include: [:invoice_items, :customer])
      else
        render json: { errors: @invoice.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_invoice
      @invoice = Invoice.includes(:invoice_items, :customer).find(params[:id])
    end

    def invoice_params
      params.require(:invoice).permit(
        :customer_id, :title, :invoice_date, :due_date, :status,
        :billing_name, :billing_postal_code, :billing_address,
        :billing_tel, :billing_person_in_charge, :note
      )
    end

    def items_params
      params.fetch(:invoice, {}).permit(invoice_items: %i[position description quantity unit unit_price tax_category])[:invoice_items] || []
    end

    def assign_items(invoice)
      items_params.each do |item|
        invoice.invoice_items.build(item)
      end
    end
  end
end
