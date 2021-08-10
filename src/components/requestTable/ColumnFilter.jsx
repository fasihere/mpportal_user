
export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <span>
            <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} style={{width:"75px", marginTop:"10px", border:"none", borderRadius:"5px"}} />
        </span>
    )
}
