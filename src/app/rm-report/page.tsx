import type { Metadata } from 'next'

import RmReportUI from './ui'

export const metadata: Metadata = {
  title: 'RM Report'
}

const RmReportPage = () => <RmReportUI />

export default RmReportPage
