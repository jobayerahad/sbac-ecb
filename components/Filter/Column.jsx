const ColumnFilter = ({ column: { filterValue, setFilter } }) => (
  <input
    type="text"
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value)}
    className="search search-column"
  />
)

export default ColumnFilter
