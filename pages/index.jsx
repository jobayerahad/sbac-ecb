import axios from 'axios'
import { useQuery } from 'react-query'
import Table from '@components/Table'
import Error from '@components/common/Error'
import Loader from '@components/Loader'

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employees`

const Home = () => {
  const { isLoading, error, data } = useQuery('employeeData', async () => (await axios.get(apiUrl)).data)

  if (isLoading) return <Loader />
  if (error) return <Error error={error} />

  return (
    <>
      <h1 className="heading">SBAC Contact Information</h1>

      <Table employees={data} />

      <img src="/images/logo-full.png" alt="SBAC Logo" className="logo" />
    </>
  )
}

export default Home
