import type { Metadata } from 'next'

import ContactBookUI from './ui'
import { getLocations } from '@actions/locations'

export const metadata: Metadata = {
  title: 'SBAC EmpDirectory - Find, Connect, Collaborate'
}

const Home = async () => {
  const branches = await getLocations('branch')
  const sub_branches = await getLocations('sub-branch')

  return <ContactBookUI locations={{ branches, sub_branches }} />
}

export default Home
