import { useCallback, useMemo, useState } from 'react'
import { utils, writeFileXLSX } from 'xlsx'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel
} from '@tanstack/react-table'
import { useDebouncedValue } from '@mantine/hooks'
import { Button, Group, Pagination, Paper, Select, Table, TextInput } from '@mantine/core'

import { COLUMNS } from '@utils/columns'

const EmployeeTable = ({ employees }) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => employees, [employees])
  const [search, setSearch] = useState('')
  const [globalFilter] = useDebouncedValue(search, 200)

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    initialState: { pagination: { pageSize: 20 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(employees)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Employee Info')
    writeFileXLSX(wb, 'SBAC ECB.xlsx')
  }, [employees])

  return (
    <>
      <Group grow>
        <Select
          data={[20, 30, 50, 100].map((val) => ({
            value: val,
            label: `Show ${val}`
          }))}
          onChange={(val) => table.setPageSize(val)}
          defaultValue={20}
        />

        <div></div>
        <Button onClick={exportFile}>Export</Button>
        <div></div>

        <TextInput placeholder="Search here..." value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
      </Group>

      <Paper size="md" shadow="xs" my="xs" className="table-container">
        <Table verticalSpacing={8} horizontalSpacing={12} highlightOnHover striped>
          <thead>
            {table.getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map(({ id, isPlaceholder, column, getContext }) => (
                  <th key={id}>{isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(({ id, getVisibleCells }) => (
              <tr key={id}>
                {getVisibleCells().map(({ id, column, getContext }) => (
                  <td key={id}>{flexRender(column.columnDef.cell, getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      {table.getPageCount() > 1 && (
        <Group position="center">
          <Pagination
            size="sm"
            page={table.getState().pagination.pageIndex + 1}
            onChange={(page) => {
              const pageNumber = Number(page) - 1 || 0
              table.setPageIndex(pageNumber)
            }}
            total={table.getPageCount()}
          />
        </Group>
      )}
    </>
  )
}

export default EmployeeTable
