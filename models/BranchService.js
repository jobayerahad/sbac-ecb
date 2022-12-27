import mongoose from 'mongoose'

const BranchServiceSchema = new mongoose.Schema({
  code: Number,
  name_en: String,
  name_bn: String
})

export default mongoose.models['branch-services'] || mongoose.model('branch-services', BranchServiceSchema)
