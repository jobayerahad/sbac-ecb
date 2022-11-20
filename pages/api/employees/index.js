import dbConnect from '@utils/dbConnect'
import Employee from '@models/Employee'
import { apiErrorMsg } from '@utils/helpers'

const hideEmployees = [1067, 49]

export default async function handler(req, res) {
  const { method, query } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        if (query && Object.keys(query).length !== 0) {
          const employee = await Employee.find({
            [Object.keys(query)[0]]: Object.values(query)[0],
            emp_id: { $nin: hideEmployees }
          })
            .sort({ rank: 1, emp_id: 1 })
            .select(['-_id', '-__v', '-rank'])

          res.send(employee)
          break
        }

        const employees = await Employee.find({ emp_id: { $nin: hideEmployees } })
          .sort({ rank: 1, emp_id: 1 })
          .select(['-_id', '-__v', '-rank'])

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
