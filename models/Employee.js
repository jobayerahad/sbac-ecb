import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  emp_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  cell_phone: {
    type: String
  },
  department: {
    type: String
  },
  designation: {
    type: String
  },
  branch_code: {
    type: String
  },
  branch_div: {
    type: String
  },
  rank: {
    type: Number
  }
})

export default mongoose.model.employee || mongoose.model('employee', EmployeeSchema)
