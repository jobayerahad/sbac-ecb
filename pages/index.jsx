import { Image, Title } from '@mantine/core'
import { PuffLoader } from 'react-spinners'

import EmployeeTable from '@components/EmployeeTable'
import Error from '@components/common/Error'
import { useEmployeesData } from '@utils/api'
import { sanitizeTableData } from '@utils/helpers'

const Home = () => {
  const { isLoading, error, data } = useEmployeesData()

  if (isLoading)
    return (
      <div className="error-container">
        <PuffLoader />
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
