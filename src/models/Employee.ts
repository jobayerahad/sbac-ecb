import { Model, Schema, model, models } from 'mongoose'

import { IEmployee } from '@types'

const EmployeeSchema: Schema = new Schema({
  empId: {
    type: Number,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    trim: true
  },

  phone: {
    type: String,
    trim: true
  },

  cellNo: {
    type: String,
    trim: true
  },

  department: {
    type: String,
    trim: true
  },

  designation: {
    type: String,
    trim: true
  },

  rank: Number,

  branch: {
    code: String,
    name: String
  },

  avatar: String,

  empKey: {
    type: Number,
    required: true,
    unique: true
  },

  rmId: Number,

  cbsId: Number
})

const Employee: Model<IEmployee> = models.Employee || model<IEmployee>('Employee', EmployeeSchema)

export default Employee
