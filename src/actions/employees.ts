'use server'

import { AxiosError } from 'axios'
import { getServerSession } from 'next-auth'

import api from '@utils/api'
import { RmReportParams } from '@types'
import { authOptions } from '@utils/authOptions'

export const getRmReport = async (params: RmReportParams) => {
  try {
    const session = await getServerSession(authOptions)

    const { data } = await api(session?.user.id).get('/cbs/rm-report', { params })
    return data
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data
  }
}

export const getEmployees = async (page: number, limit: number, search?: string, branch?: string) => {
  const { data } = await api().get('/employees', { params: { page, limit, search, branch } })
  return data
}
