import NextCors from 'nextjs-cors'
import connect from 'db/connect'
import Employee from 'models/Employee'

const employeeByRmId = async (req, res) => {
  const { rm_id } = req.query

  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

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
