import axios, { AxiosInstance } from 'axios'

const serverBaseURL: string = process.env.INTERBRIDGE_API as string
const clientBaseURL: string = process.env.NEXT_PUBLIC_INTERBRIDGE_API as string

// Create a common axios instance with base configurations
const createApiInstance = (baseURL: string, token?: string): AxiosInstance => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  return axios.create({
    baseURL,
    headers
  })
}

const clientAPI = (token: string): AxiosInstance => createApiInstance(clientBaseURL, token)
const serverAPI = (token?: string): AxiosInstance => createApiInstance(serverBaseURL, token)

export { clientAPI, serverAPI }
export default clientAPI
