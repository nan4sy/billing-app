import { useEffect, useState } from 'react'
import { Customer, InvoiceItem } from '../types'

interface Props {
  customers: Customer[]
  onSubmit: (attrs: any, items: InvoiceItem[]) => void
}

const defaultItem = (): InvoiceItem => ({ description: '', quantity: 1, unit_price: 0, tax_category: 'taxable_10' })

export default function InvoiceForm({ customers, onSubmit }: Props) {
  const [items, setItems] = useState<InvoiceItem[]>([defaultItem()])
  const [form, setForm] = useState({
    customer_id: '',
    title: '',
    invoice_date: '',
    due_date: '',
    status: 'draft',
    billing_name: '',
    billing_postal_code: '',
    billing_address: '',
    billing_tel: '',
    billing_person_in_charge: '',
    note: ''
  })

  useEffect(() => {
    const customer = customers.find((c) => c.id === Number(form.customer_id))
    if (customer) {
      setForm((prev) => ({
        ...prev,
        billing_name: customer.name,
        billing_postal_code: customer.postal_code || '',
        billing_address: customer.address || '',
        billing_tel: customer.tel || '',
        billing_person_in_charge: customer.person_in_charge || ''
      }))
    }
  }, [form.customer_id, customers])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleItemChange = (index: number, key: keyof InvoiceItem, value: any) => {
    const next = [...items]
    // @ts-expect-error dynamic assignment
    next[index][key] = value
    setItems(next)
  }

  const addItem = () => setItems([...items, defaultItem()])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payloadItems = items.map((item, idx) => ({ ...item, position: idx + 1 }))
    onSubmit(form, payloadItems)
    setItems([defaultItem()])
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="customer_id" value={form.customer_id} onChange={handleFormChange} required>
        <option value="">Select customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" required />
      <input type="date" name="invoice_date" value={form.invoice_date} onChange={handleFormChange} required />
      <input type="date" name="due_date" value={form.due_date} onChange={handleFormChange} required />
      <select name="status" value={form.status} onChange={handleFormChange}>
        <option value="draft">draft</option>
        <option value="issued">issued</option>
        <option value="sent">sent</option>
        <option value="paid">paid</option>
        <option value="canceled">canceled</option>
      </select>
      <textarea name="note" value={form.note} onChange={handleFormChange} placeholder="Note" />

      <h4>Billing Info (snapshot)</h4>
      <input name="billing_name" value={form.billing_name} onChange={handleFormChange} placeholder="Billing name" required />
      <input name="billing_postal_code" value={form.billing_postal_code} onChange={handleFormChange} placeholder="Postal code" required />
      <input name="billing_address" value={form.billing_address} onChange={handleFormChange} placeholder="Address" required />
      <input name="billing_tel" value={form.billing_tel} onChange={handleFormChange} placeholder="Tel" required />
      <input name="billing_person_in_charge" value={form.billing_person_in_charge} onChange={handleFormChange} placeholder="Person" required />

      <h4>Items</h4>
      {items.map((item, idx) => (
        <div key={idx}>
          <input
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
          />
          <input
            placeholder="Unit"
            value={item.unit || ''}
            onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
          />
          <input
            type="number"
            placeholder="Unit price"
            value={item.unit_price}
            onChange={(e) => handleItemChange(idx, 'unit_price', Number(e.target.value))}
          />
          <select value={item.tax_category} onChange={(e) => handleItemChange(idx, 'tax_category', e.target.value)}>
            <option value="taxable_10">taxable_10</option>
            <option value="non_taxable">non_taxable</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={addItem}>Add Item</button>
      <button type="submit">Create Invoice</button>
    </form>
  )
}
