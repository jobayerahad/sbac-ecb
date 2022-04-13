import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter || '')

  const onChange = useAsyncDebounce(
    (value) => {
      setFilter(value || undefined)
    },
    200,
    [value]
  )

  return (
    <input
      className="search search-global"
      type="text"
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder="Search in all columns..."
    />
  )
}

export default GlobalFilter
