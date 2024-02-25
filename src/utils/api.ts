'use server'

import axios, { AxiosInstance } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_INTERBRIDGE_API!
const accessToken = process.env.INTERBRIDGE_ACCESS_TOKEN!

// Create a common axios instance with base configurations
const api = (token?: string): AxiosInstance => {
  const headers: Record<string, string> = {}

  if (token) headers['Authorization'] = `Bearer ${token}`
  else headers['x-auth-token'] = accessToken

  return axios.create({
    baseURL,
    headers
  })
}

export default api
