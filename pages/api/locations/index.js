import dbConnect from '@utils/dbConnect'
import Location from '@models/Location'
import { apiErrorMsg } from '@utils/helpers'

export default async function handler(req, res) {
  const { method, query } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      if (!query || !query.type) return res.status(400).send(apiErrorMsg(400, 'Query type is required', 'Bad Request'))

      const locations = await Location.find({ type: query.type }).sort({ code: 1 })
      res.send(locations)
      break

    default:
      res.status(404).send(apiErrorMsg(404, `Cannot ${method} /locations`, 'Not Found'))
      break
  }
}
