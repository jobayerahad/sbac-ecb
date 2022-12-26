import dbConnect from '@utils/dbConnect'
import Branch from '@models/Branch'
import { apiErrorMsg } from '@utils/helpers'

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id }
  } = req

  await dbConnect()

  switch (method) {
    case 'PUT':
      const branch = await Branch.findByIdAndUpdate(id, body, { new: true })
      res.send(branch)
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /branches`, 'Not Found'))
      break
  }
}
