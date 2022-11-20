import axios from 'axios'
import { Agent } from 'https'
import { apiErrorMsg } from '@utils/helpers'

export default async function handler(req, res) {
  const hrbookUrl = process.env.HRBOOK_IP_ADDRESS
  const httpsAgent = new Agent({ rejectUnauthorized: false })
  const {
    method,
    query: { emp_id }
  } = req

  switch (method) {
    case 'GET':
      try {
        const { data } = await axios.post(`${hrbookUrl}/hrbook/api/emp_info.php`, { emp_id }, { httpsAgent })
        res.send(data)
      } catch (error) {
        res.status(400).send(apiErrorMsg(400, error.message, 'Bad Request'))
      }
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /hrbook/${emp_id}`, 'Not Found'))
      break
  }
}
