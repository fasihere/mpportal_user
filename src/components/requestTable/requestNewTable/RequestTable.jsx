import './requestTable.scss'
import MaterialTable from 'material-table'
import { useMemo, React } from 'react';
import MOCK_DATA from '../../../MOCK_DATA.json'

export default function RequestTable() {
    const columns = [
      { title: "Id", field: "Id" },
      { title: "Request ID", field: "request_id" },
      { title: "Subject", field: "subject" },
      { title: "Date", field: 'date' },
      { title: "Category", field: 'category' },
      { title: "Status", field: 'status' },
      { title: "Print", field: 'print' },
    ]
    const data = useMemo(() => MOCK_DATA)
    return (
      <div className="requestTable">
        <h1 style={{align:"center"}}>Request Table</h1>
        <MaterialTable
          title="Request Data"
          columns={columns}
          options={{ debounceInterval: 700, padding: "dense", filtering: true }}
          data={data}
        />
      </div>
    );
  }