import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { getQueryString } from '@utils/helpers.utils'

const useNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => getQueryString(searchParams, name, value),
    [searchParams]
  )

  const navigate = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString(name, value))
  }

  return { navigate }
}

export default useNavigation
