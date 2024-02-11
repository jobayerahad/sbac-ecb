import { AxiosRequestConfig } from 'axios'
import { useQuery } from '@tanstack/react-query'

import clientAPI from '@utils/api'

const fetchDataFromApi = async (url: string, options?: AxiosRequestConfig) => {
  const { data } = await clientAPI.instance.get(url, options)
  return data
}

export const useQueryData = (queryKey: any, url: string, options?: AxiosRequestConfig) =>
  useQuery({
    queryKey,
    queryFn: () => fetchDataFromApi(url, options),
    refetchOnWindowFocus: false
  })
