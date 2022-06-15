import mongoose from 'mongoose'

const BranchSchema = new mongoose.Schema({
  branch_code: {
    type: String,
    unique: true,
    required: [true, "'branch_code' field is required"]
  },
  branch_name: {
    type: String,
    required: [true, "'branch_name' field is required"]
  }
})

export default mongoose.models.branch || mongoose.model('branch', BranchSchema)
