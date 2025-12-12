# frozen_string_literal: true

module Api
  class CustomersController < ApplicationController
    before_action :set_customer, only: [:show]

    def index
      @customers = Customer.all.order(:id)
      render json: @customers
    end

    def show
      render json: @customer
    end

    def create
      @customer = Customer.new(customer_params)
      if @customer.save
        render json: @customer, status: :created
      else
        render json: { errors: @customer.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_customer
      @customer = Customer.find(params[:id])
    end

    def customer_params
      params.require(:customer).permit(:name, :postal_code, :address, :tel, :person_in_charge)
    end
  end
end
