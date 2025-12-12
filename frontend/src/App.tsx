import { useEffect, useState } from 'react'
import { apiClient } from './api/client'
import { Customer, Invoice, InvoiceItem } from './types'
import InvoiceForm from './components/InvoiceForm'
import CustomerForm from './components/CustomerForm'

function App() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      const [customersData, invoicesData] = await Promise.all([
        apiClient.get('/customers'),
        apiClient.get('/invoices')
      ])
      setCustomers(customersData)
      setInvoices(invoicesData)
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreateCustomer = async (attrs: Partial<Customer>) => {
    try {
      await apiClient.post('/customers', { customer: attrs })
      await loadData()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleCreateInvoice = async (attrs: any, items: InvoiceItem[]) => {
    try {
      const payload = { invoice: { ...attrs, invoice_items: items } }
      const created = await apiClient.post('/invoices', payload)
      setSelectedInvoice(created)
      await loadData()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="container">
      <h1>Billing App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h2>Customers</h2>
        <CustomerForm onSubmit={handleCreateCustomer} />
        <ul>
          {customers.map((c) => (
            <li key={c.id}>{c.name} ({c.person_in_charge})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Invoices</h2>
        <InvoiceForm customers={customers} onSubmit={handleCreateInvoice} />
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Title</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} onClick={() => setSelectedInvoice(inv)} style={{ cursor: 'pointer' }}>
                <td>{inv.invoice_number}</td>
                <td>{inv.customer?.name}</td>
                <td>{inv.title}</td>
                <td>{inv.status}</td>
                <td>{inv.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedInvoice && (
        <section>
          <h2>Invoice Detail</h2>
          <p>Invoice No: {selectedInvoice.invoice_number}</p>
          <p>Customer: {selectedInvoice.customer?.name}</p>
          <p>Title: {selectedInvoice.title}</p>
          <p>Status: {selectedInvoice.status}</p>
          <p>Total: {selectedInvoice.total_amount}</p>
          <h3>Items</h3>
          <ul>
            {selectedInvoice.invoice_items.map((item, idx) => (
              <li key={idx}>
                {item.description} x {item.quantity} @ {item.unit_price} ({item.tax_category}) = {item.line_total}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default App
