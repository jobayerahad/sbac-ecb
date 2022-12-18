import { createColumnHelper } from '@tanstack/react-table'

const { accessor } = createColumnHelper()

export const COLUMNS = [
  accessor('emp_id', {
    header: 'Employee ID',
    cell: ({ getValue }) => getValue()
  }),
  accessor('name', {
    header: 'Employee Name',
    cell: ({ getValue }) => getValue()
  }),
  accessor('designation', {
    header: 'Designation',
    cell: ({ getValue }) => getValue()
  }),
  accessor('department', {
    header: 'Department',
    cell: ({ getValue }) => getValue()
  }),
  accessor('branch_name', {
    header: 'Branch/Division',
    cell: ({ getValue }) => getValue()
  }),
  accessor('cell_phone', {
    header: 'Cell Number',
    cell: ({ getValue }) => getValue()
  }),
  accessor('phone', {
    header: 'Phone',
    cell: ({ getValue }) => getValue()
  }),
  accessor('email', {
    header: 'Email',
    cell: ({ getValue }) => getValue()
  })
]
