'use server'

import api from '@utils/api'
import { TLocation } from '@types'
import { convertLocationData } from '@utils/formatter.utils'

export const getLocations = async (type: string): Promise<TLocation[] | null> => {
  try {
    const { data } = await api().get(`/locations/type/${type}`)
    return data
  } catch (error) {
    return []
  }
}

export const getBranches = async () => {
  try {
    const [{ data: branches }, { data: subBranches }] = await Promise.all([
      api().get(`/locations/type/branch`),
      api().get(`/locations/type/sub-branch`)
    ])

    if (!branches || !subBranches) return []
    return convertLocationData({ branches, subBranches })
  } catch (error) {
    return []
  }
}
