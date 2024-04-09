import type { Metadata } from 'next'

import ContactBookUI from './ui'
import { getBranches } from '@actions/locations'

export const metadata: Metadata = {
  title: 'SBAC EmpDirectory - Find, Connect, Collaborate'
}

const Home = async () => {
  const locations = await getBranches()

  return <ContactBookUI locations={locations} />
}

export default Home
