'use server'

import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'

import api from '@utils/api'
import { StatusMsg } from '@config/strings'
import { ActionRes, RmReportParams, TEmployeeForm, TEmployeeParams } from '@types'

export const getRmReport = async (params: RmReportParams): Promise<ActionRes> => {
  try {
    const endPoint = await api()
    const { data } = await endPoint.post('/cbs/rm-report', params)

    return {
      status: StatusMsg.SUCCESS,
      message: 'RM Report generated!',
      data
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An error occured'
    }
  }
}

export const updateEmployee = async (id: string, formData: TEmployeeForm): Promise<ActionRes> => {
  try {
    const endPoint = await api()
    await endPoint.patch(`/employees/${id}`, formData)

    revalidatePath('/')

    return {
      status: StatusMsg.SUCCESS,
      message: 'Employee data updated successfully!'
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An error occured'
    }
  }
}

export const updateEmployees = async (): Promise<ActionRes> => {
  try {
    const endPoint = await api()
    const { data } = await endPoint.get('/employees/update-db')

    revalidatePath('/')

    return {
      status: StatusMsg.SUCCESS,
      message: data.message
    }
  } catch (error) {
    return {
      status: StatusMsg.BAD_REQUEST,
      message: error instanceof AxiosError ? error.response?.data.message : 'An error occured'
    }
  }
}

export const getEmployees = async (params: TEmployeeParams) => {
  const limit = params.limit || 8

  try {
    const endPoint = await api()
    const { data } = await endPoint.get('/employees', { params: { ...params, limit } })

    return data
  } catch (_) {
    return []
  }
}

export const getEmployee = async (emp_id: number) => {
  try {
    const endPoint = await api()
    const { data } = await endPoint.get('/employees', { params: { emp_id } })

    return data
  } catch (_) {
    return null
  }
}
