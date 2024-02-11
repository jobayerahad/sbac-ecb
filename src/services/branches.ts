'use server'

import Branch from '@models/Branch'
import { connectToDB } from '@utils/database.utils'

export const getBranches = async () => {
  await connectToDB()

  const branches = await Branch.find().select('-_id ').sort({ code: 1 }).lean()

  return branches
}
