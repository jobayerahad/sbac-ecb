import type { Metadata } from 'next'

import ContactBookUI from './ui'
import { getBranches } from '@actions/locations'
import { getEmployees } from '@actions/employees'

export const metadata: Metadata = {
  title: 'SBAC EmpDirectory - Find, Connect, Collaborate'
}

type Props = {
  searchParams: {
    page: number
    limit: number
    search?: string
    branch?: string
    division?: string
  }
}

const Home = async ({ searchParams: { page, limit, search, branch, division } }: Props) => {
  const locations = await getBranches()
  const data = await getEmployees(page, limit, search, branch, division)

  return <ContactBookUI locations={locations} data={data} />
}

export default Home
