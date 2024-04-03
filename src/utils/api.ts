import axios from 'axios'

const baseURL = process.env.INTERBRIDGE_API!
const accessToken = process.env.INTERBRIDGE_ACCESS_TOKEN!

// Create a common axios instance with base configurations
const api = (token?: string) => {
  const headers: Record<string, string> = {}

  if (token) headers['Authorization'] = `Bearer ${token}`
  else headers['x-auth-token'] = accessToken

  return axios.create({
    baseURL,
    headers
  })
}

export default api
