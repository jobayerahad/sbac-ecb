'use server'

import Branch from '@models/Branch'
import { connectToDB } from '@utils/database.utils'

export const getBranches = async () => {
  await connectToDB()

  const branches = await Branch.find().select('-_id ')

  return branches
}
