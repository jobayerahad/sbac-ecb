'use server'

import { AxiosError } from 'axios'

import api from '@utils/api'
import { TLocation } from '@types'
import { convertLocationData } from '@utils/formatter.utils'

export const getLocations = async (type: string): Promise<TLocation[] | null> => {
  try {
    const { data } = await api().get(`/locations/type/${type}`)
    return data
  } catch (error) {
    if (error instanceof AxiosError && error.response) return error.response.data
    return null
  }
}

export const getBranches = async () => {
  try {
    const { data: branches } = await api().get(`/locations/type/branch`)
    const { data: subBranches } = await api().get(`/locations/type/sub-branch`)

    if (!branches || !subBranches) return []
    return convertLocationData({ branches, subBranches })
  } catch (error) {
    if (error instanceof AxiosError && error.response) return error.response.data
    return []
  }
}
