import { useQuery } from '@tanstack/react-query'

import { getIP } from '@actions/ip'

export const useIpAddressData = () =>
  useQuery({
    queryKey: ['ip'],
    queryFn: () => getIP(),
    refetchOnWindowFocus: false
  })
