import './requestTable.scss'
import MOCK_DATA from '../../MOCK_DATA.json'
import { useTable, useFilters, usePagination } from 'react-table'
import { COLUMNS } from './Columns'
import { useMemo } from 'react'
import { ColumnFilter } from './ColumnFilter'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function RequestTable({selected}) {
    const { user } = useAuth()
    const columns = useMemo(() => COLUMNS,[])
    const data = useMemo((selected) => MOCK_DATA)
    // const [data, setData] = useState()
    // const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests'
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const res = await axios.get(baseUrl,{token:user.getIdToken(),statusUser:"selected"})
    //             setData(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     console.log('Hello')
    // },[])

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn: { Filter: ColumnFilter }
    }, useFilters, usePagination)
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        page,
        pageCount,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow
    } = tableInstance
    const { pageIndex, pageSize } = state
    
    return (
        <div className="requestTable">
            <h1>{selected.toUpperCase()}</h1>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map( column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            <span>{column.canFilter ? column.render('Filter'): null}</span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps("/dashboard/view/123")}>{
                                                cell.render('Cell')
                                            }</td>
                                        })}
                                </tr>
                            )})
                    }
                </tbody>
            </table>
            <div className="btns">
                <span>Page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}</span>
                <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </div>
    )
}
