import './newRequest.scss'
import axios from 'axios'
import { useState, useContext, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { IDUKKI_DATA } from '../register/laList'


export default function NewRequest() {
    const { pending, isSignedIn, user, auth } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
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
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/'
    const location = useLocation()
    const path = location.pathname.split("/")[2];

    useEffect(() => {
        const getReq = async() => {
            try{
                const config = {
                    headers: {
                      'Authorization':'Bearer '+ await user.getIdToken()
                    }
                }
                console.log(await user.getIdToken())
                const res = await axios.get(baseUrl+"users/", config);
                setName(res.data.name)
                setEmail(res.data.email)
                setMobileNo(res.data.mobileNo)
                setAddress(res.data.address)
                setPincode(res.data.pincode)
             } catch(err){
                console.log(err)
            }
        }
         getReq()
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name,
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
            statusUser: "PENDING"
        }
        const config = {
            headers: {
              'Authorization':'Bearer '+ await user.getIdToken()
            }
        }
        try{
            const res =  await axios.post(baseUrl+'requests/new', body, config);
            console.log(res.data)
            res.data && window.location.replace('/request/'+res.data.rid+'/submit')
        } catch(err){
            console.log(err.response.data)
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
                                <input type="text" required="true" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Email : </label>
                                <input type="text" required="true" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Phone Number: </label>
                                <span>+91<input type="tel" required="true" defaultValue={mobileNo} onChange={(e) => setMobileNo(e.target.value)}/></span>
                            </div>
                            <div className="inputItem">
                                <span>LokSabha Constituency :</span>
                                <span>Idukki</span>
                            </div>
                            <div className="inputItem">
                                <label>LA Constituency:</label>
                                <select value={selectedLa} onChange={(e) => changeLa(e)}>
                                    <option>-- Select --</option>
                                    {la.map(x => {
                                        return <option>{x.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="inputItem">
                                <label>Panchayat:</label>
                                <select value={selectedPanchayat} onChange={(e) => changePanchayat(e)}>
                                    <option  >-- Select --</option>
                                    {panchayat.map(x => {
                                        return <option>{x.panchayat[0]}</option>
                                    })}
                                </select>
                            </div>
                            <div className="inputItem">
                                <label>Ward:</label>
                                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                                    <option >-- Select --</option>
                                    {wards.map(x => {
                                        return <option>{x}</option>
                                    })}
                                </select>
                            </div>
                            <div className="inputItem">
                                <label>Address :</label>
                                <input type="text" required="true" defaultValue={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Pincode :</label>
                                <input className="pincode" type="tel" required="true" defaultValue={pincode} onChange={(e) => setPincode(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="requestDetails">
                        <div className="subjectContainer">
                            <label>Subject: </label>
                            <input className="requestSubject" required="true" onChange={(e) => setRequestSubject(e.target.value)}/>
                        </div>
                        <textarea className="requestContent" placeholder="Enter your request ..." onChange={(e) => setRequestBody(e.target.value)}></textarea>
                    </div>
                    <button onClick={handleSubmit} className="btn link">Add Request</button>
                </form>
            </div>
        </div>
    )
}
