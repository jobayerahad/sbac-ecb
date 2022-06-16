import connect from '@db/connect'
import Employee from '@models/Employee'
import Branch from '@models/Branch'
import { getRank } from '@utils/helpers'
import handler from '@utils/api'

// GET /api/employees
handler.get(async (req, res) => {
  const { emp_id, rm_id } = req.query
  const filter = emp_id ? { emp_id } : { rm_id }
  const select = ['-_id', '-__v', '-rank']

  try {
    connect()

    if (emp_id || rm_id) {
      const employee = await Employee.findOne(filter).select(select)

      if (!employee) throw new Error('Employee not found')
      return res.json(employee)
    }

    const employees = await Employee.find().sort({ rank: 1, emp_id: 1 }).select(select)
    return res.json(employees)
  } catch (e) {
    res.status(404).json({ ...filter, error: e.message })
  }
})

// POST /api/employees
handler.post(async (req, res) => {
  const { emp_id, designation, branch_code } = req.body

  try {
    connect()

    const employee = await Employee.findOne({ emp_id })
    if (employee) throw new Error('Employee already exists')

    const branch = await Branch.findOne({ branch_code: branch_code ? branch_code : '0001' })
    const rank = getRank(designation)
    console.log(rank)

    const newEmployee = new Employee({
      ...req.body,
      branch_name: branch.branch_name,
      rank
    })
    await newEmployee.save()

    return res.json(newEmployee)
  } catch (e) {
    if (e.name === 'ValidationError') {
      let errors = []
      Object.keys(e.errors).forEach((key) => errors.push(e.errors[key].message))
      return res.status(400).send({ type: e.name, errors })
    }

    res.status(400).json({ error: e.message })
  }
})

export default handler
