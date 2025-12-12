const BASE_URL = 'http://localhost:3000/api'

type Options = RequestInit & { json?: any }

async function request(path: string, options: Options = {}) {
  const headers: HeadersInit = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.json ? JSON.stringify(options.json) : options.body
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API Error ${response.status}: ${errorText}`)
  }

  if (response.status === 204) return null
  return response.json()
}

export const apiClient = {
  get: (path: string) => request(path),
  post: (path: string, json?: any) => request(path, { method: 'POST', json }),
  patch: (path: string, json?: any) => request(path, { method: 'PATCH', json })
}
