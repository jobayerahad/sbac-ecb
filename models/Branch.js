import mongoose from 'mongoose'

const BranchSchema = new mongoose.Schema({
  branch_code: String,
  branch_name: String
})

export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema)
