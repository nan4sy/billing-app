# frozen_string_literal: true

class CreateCustomers < ActiveRecord::Migration[7.1]
  def change
    create_table :customers do |t|
      t.string :name, null: false
      t.string :postal_code
      t.string :address
      t.string :tel
      t.string :person_in_charge

      t.timestamps
    end
  end
end
