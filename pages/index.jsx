import axios from 'axios'
import Table from '@components/Table'
import { useQuery } from 'react-query'

const Home = () => {
  const { isLoading, error, data } = useQuery(
    'employeeData',
    async () => (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/employees`)).data
  )

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <h1 className="heading">SBAC Contact Information</h1>

      <Table employees={data} />
    </>
  )
}

export default Home
