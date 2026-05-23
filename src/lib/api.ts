import axios from 'axios'
import { auth } from '@auth'

// Create a common axios instance with base configurations
const api = async () => {
  const session = await auth()

  const headers: Record<string, string> = {}

  if (session) headers['Authorization'] = `Bearer ${session.user.id}`
  else headers['x-auth-token'] = process.env.INTERBRIDGE_ACCESS_TOKEN!

  return axios.create({
    baseURL: process.env.INTERBRIDGE_API,
    headers
  })
}

export default api
