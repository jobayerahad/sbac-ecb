import { createColumnHelper } from '@tanstack/react-table'

const { accessor } = createColumnHelper()

export const COLUMNS = [
  accessor('emp_id', {
    header: 'Employee ID',
    cell: (info) => info.getValue()
  }),
  accessor('name', {
    header: 'Employee Name',
    cell: (info) => info.getValue()
  }),
  accessor('designation', {
    header: 'Designation',
    cell: (info) => info.getValue()
  }),
  accessor('department', {
    header: 'Department',
    cell: (info) => info.getValue()
  }),
  accessor('branch_name', {
    header: 'Branch/Division',
    cell: (info) => info.getValue()
  }),
  accessor('cell_phone', {
    header: 'Cell Number',
    cell: (info) => info.getValue()
  }),
  accessor('phone', {
    header: 'Phone',
    cell: (info) => info.getValue()
  }),
  accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue()
  })
]
