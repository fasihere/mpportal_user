import { CustomInput } from 'reactstrap'
import { useMemo } from 'react'

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    return (
      <CustomInput
        id="custom-select"
        type="select"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        style={{width:"75px", marginTop:"10px", borderRadius:"5px"}}
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </CustomInput>
    )
  }