import { IBranch } from './location'

export type IEmployee = {
  empId: number
  name: string
  email: string
  phone?: string
  cellNo?: string
  department?: string
  designation?: string
  rank?: number
  branch?: IBranch
  avatar?: string
  empKey: number
  rmId?: number
  cbsId?: number
}
