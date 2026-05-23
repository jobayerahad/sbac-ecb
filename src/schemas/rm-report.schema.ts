import { z } from 'zod'

export const rmReportSchema = z
  .object({
    empId: z
      .number({
        error: (issue) => (issue.input === undefined ? 'Employee ID is required' : 'Employee ID must be a number')
      })
      .positive({ error: 'Employee ID must be a positive number' })
      .int({ error: 'Employee ID must be an integer' }),

    startDate: z.coerce.date({
      error: 'Start date is required'
    }),

    endDate: z.coerce.date({
      error: 'End date is required'
    })
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date cannot be earlier than start date',
    path: ['endDate']
  })

export type RmReportSchema = z.infer<typeof rmReportSchema>
