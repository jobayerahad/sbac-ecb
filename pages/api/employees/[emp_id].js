import connect from '@db/connect'
import handler from '@utils/api'
import Employee from '@models/Employee'
import Branch from '@models/Branch'
import { getRank } from '@utils/helpers'

handler.put(async (req, res) => {
  const { emp_id } = req.query
  const { designation, branch_code } = req.body
  const rank = getRank(designation)
  const select = ['-_id', '-__v', '-rank']

  try {
    connect()

    let employee = await Employee.findOne({ emp_id })
    if (!employee) throw new Error('Employee not found')

    const branch = await Branch.findOne({ branch_code: branch_code ? branch_code : employee.branch_code })
    if (!branch) throw new Error('Invalid Branch Code')

    employee = await Employee.findOneAndUpdate(
      { emp_id },
      { ...req.body, rank, branch_name: branch.branch_name },
      { new: true }
    ).select(select)

    return res.json(employee)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

handler.delete(async (req, res) => {
  const { emp_id } = req.query

  try {
    connect()

    const employee = await Employee.findOne({ emp_id })

    if (!employee) throw new Error('Employee not found')

    await employee.remove()

    return res.json({ message: 'Employee deleted' })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

export default handler
