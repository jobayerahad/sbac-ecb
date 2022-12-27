import mongoose from 'mongoose'

const BranchSchema = new mongoose.Schema({
  branch_code: String,
  branch_name: String,
  branch_name_bangla: String,
  sbs_code: String,
  address: {
    street: String,
    street_bangla: String,
    area: String,
    nearest_place: String,
    post_code: String,
    upazila: Number,
    district: Number,
    division: Number
  },
  routing_no: String,
  email: String,
  fax: String,
  telephone_no: String,
  opening_date: Date
})

export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema)
