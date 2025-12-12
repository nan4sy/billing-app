# frozen_string_literal: true

customers = [
  { name: "Acme Corp", postal_code: "100-0001", address: "Tokyo", tel: "03-0000-0000", person_in_charge: "Taro" },
  { name: "Beta LLC", postal_code: "150-0001", address: "Shibuya", tel: "03-1111-2222", person_in_charge: "Hanako" },
  { name: "Gamma Inc", postal_code: "530-0001", address: "Osaka", tel: "06-3333-4444", person_in_charge: "Ken" }
]

customers.each do |attrs|
  Customer.find_or_create_by!(name: attrs[:name]) do |c|
    c.assign_attributes(attrs)
  end
end
