import dbConnect from '@utils/dbConnect'
import Employee from '@models/Employee'
import { apiErrorMsg } from '@utils/helpers'
import { empOptions } from '@config/constants'

export default async function handler(req, res) {
  const {
    method,
    query: { id }
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const employees = await Employee.find({ branch_code: id }).sort(empOptions.sort).select(empOptions.filter)
      res.send(employees)
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /branches`, 'Not Found'))
      break
  }
}
