import axios from 'axios'
import { RingLoader } from 'react-spinners'
import { useQuery } from 'react-query'
import Table from '@components/Table'

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employees`

const Home = () => {
  const { isLoading, error, data } = useQuery('employeeData', async () => (await axios.get(apiUrl)).data)

  if (isLoading)
    return (
      <div className="loading-container">
        <RingLoader />
        Fetching data...
      </div>
    )

  if (error)
    return (
      <div className="error-container">
        <div className="error-msg">
          <img src="images/not-found.svg" alt="" />

          <div>
            <p className="error-code">
              {error.code === 'ECONNABORTED' ? 'Connection timeout' : 'Something went wrong'}
            </p>

            <p className="error-description">{error.message}</p>
          </div>
        </div>
      </div>
    )

  return (
    <>
      <h1 className="heading">SBAC Contact Information</h1>

      <Table employees={data} />

      <img src="/images/logo-full.png" alt="SBAC Logo" className="logo" />
    </>
  )
}

export default Home
