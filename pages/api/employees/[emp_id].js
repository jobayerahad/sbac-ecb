import connect from '@db/connect'
import handler from '@utils/api'
import Employee from '@models/Employee'

handler.put(async (req, res) => {
  const { emp_id } = req.query
  const select = ['-_id', '-__v', '-rank']

  try {
    connect()

    let employee = await Employee.findOne({ emp_id })

    if (!employee) throw new Error('Employee not found')

    employee = await Employee.findOneAndUpdate({ emp_id }, req.body, { new: true }).select(select)

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
