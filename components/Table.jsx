import { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, useFlexLayout } from 'react-table'

import { COLUMNS } from '@utils/columns'
import GlobalFilter from './Filter/Global'

const Table = ({ employees }) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => employees, [employees])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageSize, pageIndex, globalFilter },
    setGlobalFilter
  } = useTable(
    { columns, data, initialState: { pageSize: 20 } },
    useFlexLayout,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <>
      <header className="flex-spaced filter">
        <select className="select-dropdown" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </header>

      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(({ getHeaderGroupProps, headers }, index) => (
            <tr {...getHeaderGroupProps()} key={index}>
              {headers.map(
                (
                  { getHeaderProps, render: colRender, getSortByToggleProps, toggleSortBy, isSorted, isSortedDesc },
                  index
                ) => (
                  <th
                    {...getHeaderProps(getSortByToggleProps())}
                    onClick={() => toggleSortBy(!isSortedDesc)}
                    key={index}
                  >
                    {colRender('Header')}
                    <span key={index}>{isSorted ? (isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row)

            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      <p className="page-info">
        Page <span>{pageIndex + 1}</span> of <span>{pageOptions.length}</span>
        {' | Go To: '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          min="1"
          max={pageOptions.length}
          onChange={(e) => {
            const pageNumber = Number(e.target.value) - 1 || 0
            gotoPage(pageNumber)
          }}
        />
      </p>

      <div className="pagination">
        <button className="pagination__btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>

        <button className="pagination__btn" onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>

        <button className="pagination__btn" onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>

        <button className="pagination__btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </>
  )
}

export default Table
