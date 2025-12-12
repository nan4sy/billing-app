# frozen_string_literal: true

class CreateInvoices < ActiveRecord::Migration[7.1]
  def change
    create_table :invoices do |t|
      t.string :invoice_number, null: false
      t.references :customer, null: false, foreign_key: true
      t.string :title, null: false
      t.date :invoice_date, null: false
      t.date :due_date, null: false
      t.string :status, null: false
      t.integer :subtotal_amount, default: 0
      t.integer :tax_amount, default: 0
      t.integer :total_amount, default: 0
      t.text :note
      t.string :billing_name, null: false
      t.string :billing_postal_code, null: false
      t.string :billing_address, null: false
      t.string :billing_tel, null: false
      t.string :billing_person_in_charge, null: false

      t.timestamps
    end
    add_index :invoices, :invoice_number, unique: true
  end
end
