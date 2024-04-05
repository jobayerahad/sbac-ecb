import type { Metadata } from 'next'

// import ContactBookUI from './ui'
// import { getBranches } from '@actions/locations'
import EidCard from './eid-card'

export const metadata: Metadata = {
  title: 'SBAC EmpDirectory - Find, Connect, Collaborate'
}

// const Home = async () => {
//   const locations = await getBranches()

//   return <ContactBookUI locations={locations} />
// }

const Home = () => <EidCard />

export default Home
