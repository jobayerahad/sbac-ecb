import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import RmReportUI from './ui'
import { getIP } from '@actions/ip'

export const metadata: Metadata = {
  title: 'RM Report'
}

const RmReport = async () => {
  const ip = await getIP()
  const isItd = ip?.startsWith('172.19.100.') || '::1'

  if (!isItd) notFound()
  return <RmReportUI />
}

export default RmReport
