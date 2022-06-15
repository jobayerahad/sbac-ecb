import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
  emp_id: {
    type: Number,
    required: [true, "'emp_id' field is required"],
  },
  name: {
    type: String,
    required: [true, "'name' field is required"],
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
    type: String,
    required: [true, "'designation' field is required"],
  },
  branch_code: {
    type: String,
    required: [true, "'branch_code' field is required"],
  },
  branch_name: {
    type: String
  },
  avatar: {
    type: String
  },
  rank: {
    type: Number
  },
  rm_id: {
    type: Number
  }
})

export default mongoose.models.employee || mongoose.model('employee', EmployeeSchema)
