import { Model, Schema, model, models } from 'mongoose'

import { IBranch } from '@types'

const BranchSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  }
})

const Branch: Model<IBranch> = models.Branch || model<IBranch>('Branch', BranchSchema)

export default Branch
