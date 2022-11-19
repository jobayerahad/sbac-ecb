import { Image, Text, Title } from '@mantine/core'
import Loader from 'react-spinners/PuffLoader'

import EmployeeTable from '@components/EmployeeTable'
import Error from '@components/common/Error'
import { useEmployeesData } from '@utils/api'
import { sanitizeTableData } from '@utils/helpers'

const Home = () => {
  const { isLoading, error, data } = useEmployeesData()

  if (isLoading)
    return (
      <div className="error-container">
        <Loader />
      </div>
    )
  if (error) return <Error error={error} />

  return (
    <>
      <Title align="center">Employee Contact Information</Title>

      <EmployeeTable employees={sanitizeTableData(data)} />

      <Image src="/images/logo-full.png" alt="SBAC Logo" width={60} className="logo" />
    </>
  )
}

export default Home
