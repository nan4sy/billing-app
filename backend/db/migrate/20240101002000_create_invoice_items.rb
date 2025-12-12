# frozen_string_literal: true

class CreateInvoiceItems < ActiveRecord::Migration[7.1]
  def change
    create_table :invoice_items do |t|
      t.references :invoice, null: false, foreign_key: true
      t.integer :position
      t.string :description, null: false
      t.decimal :quantity, precision: 10, scale: 2
      t.string :unit
      t.integer :unit_price
      t.string :tax_category
      t.integer :line_subtotal, default: 0
      t.integer :line_tax, default: 0
      t.integer :line_total, default: 0

      t.timestamps
    end
  end
end
