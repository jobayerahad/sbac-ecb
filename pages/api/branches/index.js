import dbConnect from '@utils/dbConnect'
import Branch from '@models/Branch'
import { apiErrorMsg } from '@utils/helpers'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const branches = await Branch.find().select(['branch_code', 'branch_name']).sort({ branch_code: 1 })
      res.send(branches)
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /branches`, 'Not Found'))
      break
  }
}
