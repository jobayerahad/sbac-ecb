import dbConnect from '@utils/dbConnect'
import BranchService from '@models/BranchService'
import { apiErrorMsg } from '@utils/helpers'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const branchServices = await BranchService.find().sort({ code: 1 })
      res.send(branchServices)
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /branches/services`, 'Not Found'))
      break
  }
}
