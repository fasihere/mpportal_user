import './newRequest.scss'
import axios from 'axios'
import { useState, useContext, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { IDUKKI_DATA } from '../register/laList'


export default function NewRequest() {
    const { pending, isSignedIn, user, auth } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState(user.phoneNumber)
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState(null)
    const [error, setError] = useState(false)
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState()
    const [selectedPanchayat, setSelectedPanchayat] = useState()
    const [selectedWard, setSelectedWard] = useState()
    const [requestSubject, setRequestSubject] = useState()
    const [requestBody, setRequestBody] = useState()
    const [rid, setRid] = useState()
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests'
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name:name,
            email,
            mobileNo: mobileNo,
            address,
            loksabha:"Idukki",
            assembly: selectedLa,
            panchayat: selectedPanchayat,
            ward: selectedWard,
            pincode,
            requestSubject,
            requestBody,
            status: "UNREAD",
            statusUser: "UNREAD"
        }
        const config = {
            headers: {
              'Authorization':'Bearer '+ await user.getIdToken()
            }
        }
        try{
            const res =  await axios.post(baseUrl+'/new', body, config);
            setRid(res.data.rid)
            window.location.replace('/request/'+res.data.rid)
        } catch(err){ 
            console.log(err)
            setError(true)
        }
    };
    
    const laList = useMemo(() => IDUKKI_DATA)
    useEffect(() => {
        setLa(laList)
    },[laList])

    const changeLa = (e) => {
        setSelectedLa(e.target.value)
        if(la.find(x=>x.name===e.target.value)){
            setPanchayat(la.find(x=>x.name===e.target.value).panchayatList)
        }
        setWards([])
    }
    const changePanchayat = (e) => {
        setSelectedPanchayat(e.target.value)
        if(panchayat.find(x=>x.panchayat[0]===e.target.value)){
            const ward = panchayat.find(x=>x.panchayat[0]===e.target.value).panchayat[1]
            const list = []
            for(let i=1; i<=ward; i++) {
                list.push(i)
        }
        setWards(list)
        }
    }

    return (
        <div className="newRequest">
            <div className="wrapper">
                <form >
                    <h2 className="title">New Request <i className="fas fa-envelope-open-text"></i></h2>
                    <div className="personalDetails">
                        <h2>Personal Details</h2>
                        <div className="inputContainer">
                            <div className="inputItem">
                                <label>Name :</label>
                                <input type="text" required="true" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Email :</label>
                                <input type="text" required="true" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Phone Number: </label>
                                <span>+91</span><input type="tel" required="true" onChange={(e) => setMobileNo(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <span>LokSabha Constituency :</span>
                                <span>Idukki</span>
                            </div>
                            <div className="inputItem">
                                <label>LA Constituency:</label>
                                <select value={selectedLa} onChange={(e) => changeLa(e)}>
                                    <option selected>-- Select --</option>
                                    {la.map(x => {
                                        return <option>{x.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="inputItem">
                                <label>Panchayat:</label>
                                <select value={selectedPanchayat} onChange={(e) => changePanchayat(e)}>
                                    <option selected >-- Select --</option>
                                    {panchayat.map(x => {
                                        return <option>{x.panchayat[0]}</option>
                                    })}
                                </select>
                            </div>
                            <div className="inputItem">
                                <label>Ward:</label>
                                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                                    <option selected >-- Select --</option>
                                    {wards.map(x => {
                                        return <option>{x}</option>
                                    })}
                                </select>
                            </div>
                            <div className="inputItem">
                                <label>Address :</label>
                                <input type="text" required="true" onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Pincode :</label>
                                <input type="tel" required="true" onChange={(e) => setPincode(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="requestDetails">
                        <div className="subjectContainer">
                            <label>Subject: </label>
                            <input className="requestSubject" required="true"/>
                        </div>
                        <textarea className="requestContent" placeholder="Enter your request ..."></textarea>
                    </div>
                    <Link to={"/request/"+rid+"/submit"} className="btn link">Add Request</Link>
                </form>
            </div>
        </div>
    )
}
