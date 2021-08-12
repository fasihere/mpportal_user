import RequestTable from '../../components/requestTable/requestNewTable/RequestTable'
import './dashboard.scss'
import './sideMenu.scss'
import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Alert } from 'reactstrap'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'

export default function Dashboard() {
    const { user, auth, isSignedIn } = useAuth()
    const [selected, setSelected] = useState("Pending")
    const [requests,setRequests] = useState()
    const [error, setError] = useState("")
    const [userDetails, setUserDetails] = useState()
    const [option,setOption] = useState("All")
    const [selectedDate, setSelectedDate] = useState()
    const list =  [
        {
            id:"Pending"
        },
        {
            id:"Completed"
        },
        {
            id:"Draft"
        }
    ]
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/users/'
    useEffect(() => {
        const getUser = async () =>{
            try{
                const config = {
                    headers: {
                    'Authorization':'Bearer '+ await user.getIdToken()
                    }
                }
                const res = await axios.get(baseUrl, config)
                setUserDetails(res.data)
            } catch(err){
                console.log(err)
            }

        }
    })
    const handleOptions = (e) => {
        if(e.target.value === 'By Date'){
            setSelectedDate(new Date())
        }
        else{
            setSelectedDate()
        }
        setOption(e.target.value)
    }
    if(isSignedIn && !user.displayName){
        return( <Redirect to="/register"></Redirect>)
    }
    return (
        <div className="dashboard">
            <div className="sideMenu">
                <ul>
                    {
                        list.map((val,key) => {
                            return(
                                <li
                                key={key}
                                onClick={() => {
                                    setSelected(val.id)
                                    }}
                                className={val.id == selected ? "active":""}
                                >
                                    {val.id}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className="wrapper">
                <span className="wrapperLeft">
                </span>
                <div className="wrapperRight">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h1>Welcome {user.displayName}</h1>
                    <div className="top">
                        <Link to="/request/new" className="btn link">New Request</Link>
                        <p className="info">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsa, nam numquam impedit blanditiis soluta
                            tempora. Dolores neque quam dolorum libero veritatis
                            nulla laborum ex quisquam?
                        </p>
                    </div>
                    <div className="bottom">
                        <div className="filter">
                            <label>Fetch Requests :</label>
                            <select value={option} onChange={(e) => handleOptions(e)}>
                                <option selected>All</option>
                                <option>By Date</option>
                            </select>
                            {option === "By Date" && 
                            <MuiPickersUtilsProvider utils={DateFnsUtils} className="date">
                                <Grid container justify='space-around' style={{position:"absolute",width:"200px",right:"300px"}}>
                                    <KeyboardDatePicker disableToolbar
                                    variant='inline'
                                    format='yyyy-MM-dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='Date Picker'
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    KeyboardButtonProps={{
                                        'arial-label':'change date'
                                    }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>}
                        </div>
                        <RequestTable selected={selected.toUpperCase()} date={selectedDate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
