import dbConnect from '@utils/dbConnect'
import Employee from '@models/Employee'
import { apiErrorMsg } from '@utils/helpers'
import { empOptions } from '@config/constants'

export default async function handler(req, res) {
  const { method, query } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        if (query && Object.keys(query).length !== 0) {
          const key = Object.keys(query)[0]
          const value = Object.values(query)[0]
          const valIsNumber = Number(value)

          let employee = null

          if (valIsNumber) employee = await Employee.findOne({ [key]: Number(value) }).select(empOptions.filter)
          else
            employee = await Employee.find({
              [key]: value,
              emp_id: { $nin: empOptions.exclude, $lt: empOptions.range }
            })
              .sort(empOptions.sort)
              .select(empOptions.filter)

          res.send(employee)
          break
        }

        const employees = await Employee.find({ emp_id: { $nin: empOptions.exclude, $lt: empOptions.range } })
          .sort(empOptions.sort)
          .select(empOptions.filter)

        res.send(employees)
        break
      } catch (error) {
        res.status(400).send(apiErrorMsg(400, error.message, 'Bad Request'))
      }

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /employees`, 'Not Found'))
      break
  }
}
