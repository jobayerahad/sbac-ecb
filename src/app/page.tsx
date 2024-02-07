import type { Metadata } from 'next'

import ContactBookUI from './ui'
import { getBranches } from '@services/branches'

export const metadata: Metadata = {
  title: 'SBAC EmpDirectory - Find, Connect, Collaborate'
}

const Home = async () => {
  const branches = await getBranches()

  return <ContactBookUI branches={branches} />
}

export default Home
