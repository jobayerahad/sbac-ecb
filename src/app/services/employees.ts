'use server'

import api from '@utils/api'

export const getEmployees = async (page: number, limit: number, search?: string, branch?: string) => {
  const { data } = await api().get('/employees', { params: { page, limit, search, branch } })
  return data
}
