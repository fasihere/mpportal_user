import RequestTable from '../../components/requestTable/RequestTable'
import './dashboard.scss'
import './sideMenu.scss'
import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Alert } from 'reactstrap'
import axios from 'axios'

export default function Dashboard() {
    const { user, auth, isSignedIn } = useAuth()
    const [selected, setSelected] = useState("Pending")
    const [requests,setRequests] = useState()
    const [error, setError] = useState("")
    const [userDetails, setUserDetails] = useState()
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
                        <RequestTable selected={selected}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
