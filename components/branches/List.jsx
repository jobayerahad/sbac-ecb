import { useMemo } from 'react'

import { COLUMNS } from './utils/columns'
import TableData from '@components/common/TableData'

const BranchList = ({ list }) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => list, [list])

  return <TableData data={data} columns={columns} />
}

export default BranchList
