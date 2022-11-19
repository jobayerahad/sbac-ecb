import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  emp_id: Number,
  name: String,
  email: String,
  phone: String,
  cell_phone: String,
  department: String,
  designation: String,
  rank: Number,
  branch_code: String,
  branch_name: String,
  avatar: String,
  emp_key: Number,
  rm_id: Number
})

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)
