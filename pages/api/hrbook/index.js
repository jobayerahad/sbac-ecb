import axios from 'axios'
import { Agent } from 'https'
import { apiErrorMsg, formatHrData } from '@utils/helpers'

export default async function handler(req, res) {
  const hrbookUrl = process.env.HRBOOK_IP_ADDRESS
  const httpsAgent = new Agent({ rejectUnauthorized: false })
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { data } = await axios.get(`${hrbookUrl}/hrbook/api/emp_info_all.php`, { httpsAgent })
        const employees = data?.map((empData) => formatHrData(empData))
        res.send(employees)
      } catch (error) {
        res.status(400).send(apiErrorMsg(400, error.message, 'Bad Request'))
      }
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /hrbook`, 'Not Found'))
      break
  }
}
