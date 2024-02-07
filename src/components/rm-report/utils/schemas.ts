import * as Yup from 'yup'
import { rmReportProps } from '@types'

export const rmReportSchema = Yup.object<rmReportProps>().shape({
  empId: Yup.number()
    .required('Employee ID is required')
    .positive('Employee ID must be a positive number')
    .integer('Employee ID must be an integer'),

  startDate: Yup.date().required(),

  endDate: Yup.date().required().min(Yup.ref('startDate'), 'End date cannot be earlier than start date')
})
