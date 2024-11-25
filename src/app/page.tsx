import type { Metadata } from 'next'

import ContactBookUI from './ui'
import { getBranches } from '@actions/locations'
import { getEmployees } from '@actions/employees'
import { TEmployeeParams } from '@types'

export const metadata: Metadata = {
  title: 'Employee Directory - Find, Connect, Collaborate'
}

type SearchParams = Promise<TEmployeeParams>

const Home = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams

  const [locations, data] = await Promise.all([getBranches(), getEmployees(searchParams)])

  return <ContactBookUI locations={locations} data={data} />
}

export default Home
