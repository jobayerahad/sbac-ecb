import { createColumnHelper } from '@tanstack/react-table'
import BranchActions from '../Actions'

const { accessor } = createColumnHelper()

export const COLUMNS = [
  accessor('branch_code', {
    header: 'Branch Code',
    cell: ({ getValue }) => getValue()
  }),
  accessor('sbs_code', {
    header: 'SBS Code',
    cell: ({ getValue }) => getValue()
  }),
  accessor('branch_name', {
    header: 'Branch Name',
    cell: ({ getValue }) => getValue()
  }),
  accessor('routing_no', {
    header: 'Routing No',
    cell: ({ getValue }) => getValue()
  }),
  accessor('_id', {
    header: '',
    cell: ({ getValue, row: { original } }) => <BranchActions id={getValue()} data={original} />
  })
]
