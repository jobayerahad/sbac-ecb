'use server'

import { AxiosError } from 'axios'

import api from '@utils/api'

export const getLocations = async (type: string) => {
  try {
    const { data } = await api().get(`/locations/type/${type}`)
    return data
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}
