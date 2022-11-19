import dbConnect from '@utils/dbConnect'
import Employees from '@models/Employees'

const hideEmployees = []

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const pets = await Employees.find({ emp_id: { $nin: hideEmployees } })
          .sort({ rank: 1, emp_id: 1 })
          .select(['-_id', '-__v', '-rank'])

        res.send(pets)
      } catch (error) {
        res.status(400)
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
