import { ColumnFilter } from './ColumnFilter'
import { SelectColumnFilter } from './SelectColumnFilter'
import { Link } from 'react-router-dom'

const baseUrl = "/request/"

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Request_Id',
        accessor: 'Request_ID',
        Filter: ColumnFilter,
        Cell: e =><Link to={baseUrl + e.value} className="link" style={{fontWeight:"600"}}> {e.value} </Link>
    },
    {
        Header: 'Request',
        accessor: 'Request',
        Filter: ColumnFilter,
        Cell: ({row, value})=><Link to={baseUrl + row.original.Request_ID + "/view"} className="link" style={{fontWeight:"600"}}> Apple </Link>
    },
    {
        Header: 'Category',
        accessor: 'Category',
        Filter: SelectColumnFilter
    },
    {
        Header: 'Date',
        accessor: 'Date',
        Filter: ColumnFilter
    },
]