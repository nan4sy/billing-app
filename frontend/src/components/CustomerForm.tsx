import { useState } from 'react'

interface Props {
  onSubmit: (attrs: any) => void
}

const initialState = {
  name: '',
  postal_code: '',
  address: '',
  tel: '',
  person_in_charge: ''
}

export default function CustomerForm({ onSubmit }: Props) {
  const [form, setForm] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="postal_code" value={form.postal_code} onChange={handleChange} placeholder="Postal Code" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
      <input name="tel" value={form.tel} onChange={handleChange} placeholder="Tel" />
      <input name="person_in_charge" value={form.person_in_charge} onChange={handleChange} placeholder="Person in charge" />
      <button type="submit">Create Customer</button>
    </form>
  )
}
