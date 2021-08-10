import { ColumnFilter } from './ColumnFilter'
import { SelectColumnFilter } from './SelectColumnFilter'
import { Link } from 'react-router-dom'

const baseUrl = "/request/"

export const COLUMNS = [
    {
        Header: 'Request_Id',
        accessor: 'rif',
        Filter: ColumnFilter,
        Cell: e =><Link to={baseUrl + e.value} className="link" style={{fontWeight:"600"}}> {e.value} </Link>
    },
    {
        Header: 'Request',
        accessor: 'requestSubject',
        Filter: ColumnFilter,
        Cell: ({row, value})=><Link to={baseUrl + row.original.Request_ID + "/view"} className="link" style={{fontWeight:"600"}}> Apple </Link>
    },
    {
        Header: 'Date',
        accessor: 'postedTime.slice(0,9)',
        Filter: ColumnFilter
    },
]
