import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './authOptions'

const baseURL = process.env.INTERBRIDGE_API!
const accessToken = process.env.INTERBRIDGE_ACCESS_TOKEN!

// Create a common axios instance with base configurations
const api = async () => {
  const session = await getServerSession(authOptions)

  const headers: Record<string, string> = {}

  if (session) headers['Authorization'] = `Bearer ${session.user.id}`
  else headers['x-auth-token'] = accessToken

  return axios.create({
    baseURL,
    headers
  })
}

export default api
