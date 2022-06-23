import axios from 'axios'
import { RingLoader } from 'react-spinners'
import { useQuery } from 'react-query'

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/branches`

const Branches = () => {
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
    <table className="table">
      <thead>
        <tr>
          <th>Serial No</th>
          <th>Branch Code</th>
          <th>Branch Name</th>
        </tr>
      </thead>

      <tbody>
        {data.map((branch, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{branch.branch_code}</td>
            <td>{branch.branch_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Branches
