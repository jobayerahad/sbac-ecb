import connect from 'db/connect'
import Employee from 'models/Employee'

const employees = async (_, res) => {
  try {
    connect()
    const employees = await Employee.find().sort({ rank: 1, emp_id: 1 })
    res.json(employees)
  } catch (e) {
    res.json({ error: e.message })
  }
}

export default employees
