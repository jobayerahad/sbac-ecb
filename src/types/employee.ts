export type TEmployee = {
  empId: number
  name: string
  email: string
  phone: string
  cellNo: string
  department: string
  designation: string
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
