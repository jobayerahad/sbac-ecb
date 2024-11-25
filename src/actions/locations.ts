'use server'

import api from '@utils/api'
import { convertLocationData } from '@utils/formatter.utils'
import { TLocation } from '@types'

export const getLocations = async (type: string): Promise<TLocation[] | null> => {
  try {
    const endPoint = await api()
    const { data } = await endPoint.get(`/locations/type/${type}`)

    return data
  } catch (error) {
    return []
  }
}

export const getBranches = async () => {
  try {
    const endPoint = await api()
    const [{ data: branches }, { data: subBranches }] = await Promise.all([
      endPoint.get(`/locations/type/branch`),
      endPoint.get(`/locations/type/sub-branch`)
    ])

    if (!branches || !subBranches) return []
    return convertLocationData({ branches, subBranches })
  } catch (error) {
    return []
  }
}
