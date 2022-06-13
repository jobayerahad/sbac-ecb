import nc from 'next-connect'
import NextCors from 'nextjs-cors'
import connect from '@db/connect'
import Employee from '@models/Employee'

const employees = async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const { emp_id, rm_id } = req.query
  const filter = emp_id ? { emp_id } : { rm_id }
  const select = ['-_id', '-__v', '-rank']

  try {
    connect()

    if (req.method === 'GET') {
      if (emp_id || rm_id) {
        const employee = await Employee.findOne(filter).select(select)

        if (!employee) throw new Error('Employee not found')

        return res.json(employee)
      }

      const employees = await Employee.find().sort({ rank: 1, emp_id: 1 }).select(select)
      return res.json(employees)
    }
  } catch (e) {
    res.json({ ...filter, error: e.message })
  }
}

export default employees
