import connect from 'db/connect'
import Employee from 'models/Employee'

const employeeByRmId = async (req, res) => {
  const { rm_id } = req.query

  try {
    connect()

    if (req.method === 'GET') {
      const employee = await Employee.findOne({ rm_id })
      return res.json(employee)
    }
  } catch (e) {
    console.log(e)
    res.json({ error: e?.message })
  }
}

export default employeeByRmId
