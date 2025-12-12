export type Customer = {
  id: number
  name: string
  postal_code?: string
  address?: string
  tel?: string
  person_in_charge?: string
}

export type InvoiceItem = {
  id?: number
  position?: number
  description: string
  quantity?: number
  unit?: string
  unit_price?: number
  tax_category?: string
  line_subtotal?: number
  line_tax?: number
  line_total?: number
}

export type Invoice = {
  id: number
  invoice_number: string
  customer_id: number
  title: string
  invoice_date: string
  due_date: string
  status: string
  subtotal_amount?: number
  tax_amount?: number
  total_amount?: number
  note?: string
  billing_name: string
  billing_postal_code?: string
  billing_address?: string
  billing_tel?: string
  billing_person_in_charge?: string
  invoice_items: InvoiceItem[]
  customer?: Customer
}
