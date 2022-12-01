import axios from 'axios'
import { Agent } from 'https'
import { format } from 'date-fns'

import dbConnect from '@utils/dbConnect'
import Employee from '@models/Employee'
import Branch from '@models/Branch'

import { apiErrorMsg, apiSuccessMsg, capitalizeString, formatHrData } from '@utils/helpers'
import { getRank } from '@utils/desingation'

export default async function handler(req, res) {
  const hrbookUrl = process.env.HRBOOK_IP_ADDRESS
  const httpsAgent = new Agent({ rejectUnauthorized: false })
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { data } = await axios.get(`${hrbookUrl}/hrbook/api/emp_info_all.php`, { httpsAgent })
        const hrbookEmpData = data?.map((empData) => formatHrData(empData))

        const employees = []

        for (let i = 0; i < hrbookEmpData.length; i++) {
          const empData = hrbookEmpData[i]

          const dbEmp = await Employee.findOne({ emp_id: empData.emp_id })

          if (empData.branch_code) {
            const branch = await Branch.findOne({ branch_code: empData.branch_code })
            empData.branch_name = branch?.branch_name
          }

          empData.name = capitalizeString(empData.name)
          empData.department = capitalizeString(empData.department)
          empData.rank = getRank(empData.designation)

          employees.push({ ...dbEmp?.toJSON(), ...empData })
        }

        await Employee.deleteMany() // Delete all documents
        await Employee.insertMany(employees) // Add current data

        const currentTime = format(new Date(), 'do MMMM yyyy, h:mm:ss a')
        res.send(apiSuccessMsg(`Contact Info updated at: ${currentTime}`))
      } catch (_) {
        res.status(500).send(apiErrorMsg(500, 'Internal Error', 'Server Error'))
      }
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /employees/update`, 'Not Found'))
      break
  }
}
