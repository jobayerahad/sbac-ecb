import { useState } from 'react'
import { Group, Pagination, Paper, Table, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel
} from '@tanstack/react-table'

const TableData = ({ data, columns }) => {
  const [search, setSearch] = useState('')
  const [globalFilter] = useDebouncedValue(search, 200)

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <TextInput
        mt="sm"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <Paper size="md" shadow="xs" my="md">
        <Table verticalSpacing={12} horizontalSpacing="sm" highlightOnHover>
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

export default TableData
