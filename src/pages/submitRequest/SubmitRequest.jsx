import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './submitRequest.scss'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'


export default function SubmitRequest() {
    const { user } = useAuth()
    const [req, setReq] = useState()
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/'
    useEffect(() => {
        const getReq = async() => {
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const res = await axios.get(baseUrl+path, config);
            res.data && setReq(res.data)

         }
         getReq()
    },[path])

    return (
        <div className="submitRequest">
            <h2 className="title">New Request <i className="fas fa-envelope-open-text"></i></h2>
            <div className="wrapper">
                <div className="personalDetails">
                    <h2>Personal Details</h2>
                    <div className="inputContainer">
                        <div className="inputItem">
                            <span>Name :</span>
                            <span>{req && req.name}</span>
                        </div>
                        <div className="inputItem">
                            <span>Email :</span>
                            <span>{req && req.email}</span>
                        </div>
                        <div className="inputItem">
                            <span>Phone Number :</span>
                            <span>+91 {req && req.mobileNo}</span>
                        </div>
                        <div className="inputItem">
                            <span>LokSabha Constituency :</span>
                            <span>{req && req.loksabha}</span>
                        </div>
                        <div className="inputItem">
                            <span>LA Constituency :</span>
                            <span>{req && req.assembly}</span>
                        </div>
                        <div className="inputItem">
                            <span>Panchayat :</span>
                            <span>{req && req.panchayat}</span>
                        </div>
                        <div className="inputItem">
                            <span>Ward :</span>
                            <span>{req && req.ward}</span>
                        </div>
                        <div className="inputItem">
                            <span>Address :</span>
                            <p>{req && req.address}</p>
                        </div>
                        <div className="inputItem">
                            <span>Pincode :</span>
                            <span>{req && req.pincode}</span>
                        </div>
                    </div>
                </div>
                <div className="requestDetails">
                    <div className="subjectContainer">
                        <span>Subject: </span>
                        <p className="requestSubject">{req && req.requestSubject}</p>
                    </div>
                    <p className="requestContent">{req && req.requestBody}</p>
                </div>
                <Link to={"/request/"+path+"/view"} className="btn submit link">Submit</Link>
                <Link to={"/request/"+path+"/edit"} className="btn edit link">Edit <i className="fas fa-edit"></i></Link>
            </div>
        </div>
    )
}
