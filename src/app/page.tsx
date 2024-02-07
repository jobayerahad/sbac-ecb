import type { Metadata } from 'next'

import ContactBookUI from './ui'

export const metadata: Metadata = {
  title: 'SBAC EmpDirectory - Find, Connect, Collaborate'
}

const Home = () => <ContactBookUI />

export default Home
