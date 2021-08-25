import './requestTable.scss'
import MaterialTable from 'material-table'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useMemo, React, useState,useEffect } from 'react';
import MOCK_DATA from '../../../MOCK_DATA.json'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function RequestTable({selected, date}) {
    const { user } = useAuth()
    const columns = [
      { key: "1", title: "Request ID", dataIndex: "rid", },
      { key: "2", title: "Subject", dataIndex: "requestSubject",
       sorter:(record1, record2) => {
         return record1.requestSubject > record2.requestSubject
       } },
       { key: "3", title: "Date", dataIndex: 'postedTime', render: date => <div>{date.slice(0,10).split("-").reverse().join("-")}</div>,
       sorter:(record1, record2) => {
        return record1.postedTime > record2.postedTime
      } },
      { key: "4", title: "Status", dataIndex: 'statusUser' },
      { key: "5", title: "Action", render: rowData => {
      if(selected === 'DRAFT'){
        <Link className="btn" to={'/request/'+rowData.rid+'/view'}>View</Link>
      }
      <Link className="btn" to={'/request/'+rowData.rid+'/view'}>View</Link>
    } },
    ]
    const [data, setData] = useState([])
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/'
    function yyyymmdd(dateIn) {
      var yyyy = dateIn.getFullYear();
      var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
      var dd = dateIn.getDate();
      return (String(10000 * yyyy + 100 * mm + dd).slice(0,4)+'-' + String(10000 * yyyy + 100 * mm + dd).slice(4,6) + '-' + String(10000 * yyyy + 100 * mm + dd).slice(6,8)); // Leading zeros for mm and dd
    }
    useEffect(() => {
      const fetchData = async () => {
        console.log(await user.getIdToken())
        if(date){
          try{
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const body = {
                statusUser: selected,
                date: yyyymmdd(date)
            }
            const res = await axios.post(baseUrl, body, config)
            setData(res.data.details)
            console.log(yyyymmdd(date))
            res && console.log('Fetched requests using Date')
          } catch (err) {
              console.log(err.response)
              if(err.response && err.response.data.details == 'No requests yet'){
                setData([])
              }
          }
      }
        else{
          try{
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const body = { statusUser: selected }
            const res = await axios.post(baseUrl, body, config)
            console.log(await user.getIdToken())
            setData(res.data.details)
            res && console.log('Fetched requests')
        } catch (err) {
          console.log(await user.getIdToken())
            console.log(err.response)
            if(err.response && err.response.data.details == 'No requests yet'){
              setData([])
            }
        }
    }
  }
      fetchData()
  },[selected,date])

    return (
      <div className="requestTable">
        <h1 style={{align:"center"}}>{selected}</h1>
        <Table
          columns={columns}
          dataSource={data}
          pagination={true}
        />
      </div>
    );
  }
