export type TEmployee = {
  _id: string
  empId: number
  name: string
  email: string
  phone: string
  cellNo: string
  department: string
  designation: string
  unit: string
  rank: number
  branch: {
    code: string
    name: string
  }
  avatar: string
  empKey: number
  rmId: number
  cbsId: number
}

export type TEmployeeForm = {
  email: string
  phone: string
  cellNo: string
  unit: string
}
