import { Link, useHistory, useLocation } from 'react-router-dom'
import './editRequest.scss'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { IDUKKI_DATA } from '../register/laList'

export default function EditRequest() {
    const [req, setReq] = useState()
    const history = useHistory()
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/'

    const { user } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState()
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState(null)
    const [error, setError] = useState(false)
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState("")
    const [selectedPanchayat, setSelectedPanchayat] = useState("")
    const [selectedWard, setSelectedWard] = useState()
    const [requestSubject, setRequestSubject] = useState("")
    const [requestBody, setRequestBody] = useState("")

    useEffect(() => {
        const getReq = async() => {
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const res = await axios.get(baseUrl+path, config);
            res.data && setReq(res.data)
            console.log(res.data)
            setName(res.data.name)
            setEmail(res.data.email)
            setMobileNo(res.data.mobileNo)
            setAddress(res.data.address)
            setPincode(res.data.pincode)
            setRequestSubject(res.data.requestSubject)
            setRequestBody(res.data.requestBody)
         }
         getReq()
    },[path])

    const handleDraft = async (e) => {
        e.preventDefault();
        const body = {
            name,
            email,
            mobileNo: mobileNo,
            address,
            assembly: selectedLa,
            panchayat: selectedPanchayat,
            ward: selectedWard,
            pincode,
            requestSubject,
            requestBody,
            status: "DRAFT",
            statusUser: "DRAFT"
        }
        try{
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const res =  await axios.post(baseUrl+'new', body, config);
            console.log(res)
            res && window.location.replace('/dashboard')
        } catch(err){
            console.log(err)
            setError(true)
        }

    };

    const handleUpdate = async () => {
        try{
            const res = await axios.put(baseUrl+ path, {
                token: user.getIdToken(),
                name,
                email,
                mobileNo: mobileNo,
                address,
                assembly: selectedLa,
                panchayat: selectedPanchayat,
                ward: selectedWard,
                pincode,
                requestSubject,
                requestBody,
                status: "UNREAD",
                statusUser: "PENDING"
            });
            console.log(res)
            res && window.location.replace('/dashboard')
        } catch(err){
            console.log(err)
        }

     }
     const handleDelete = async () => {
        try{
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const res = await axios.delete(baseUrl+path,config);
            console.log(res)
            res && window.location.replace("/dashboard");
        } catch(err){
            console.log(err)
        }
     }

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
        <div className="editRequest">
            <h2 className="title">Edit Request</h2>
            <div className="wrapper">
                <div className="personalDetails">
                    <h2>Personal Details</h2>
                    <div className="inputContainer">
                            <div className="inputItem">
                                <label>Name :</label>
                                <input type="text" required="true" placeholder="Enter Full Name" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Email :</label>
                                <input type="text" required="true" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Phone Number: +91</label>
                                <input type="tel" required="true" defaultValue={mobileNo} onChange={(e) => setMobileNo(e.target.value)}/>
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
                                <input type="text" required="true" defaultValue={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="inputItem">
                                <label>Pincode :</label>
                                <input type="tel" required="true" defaultValue={pincode} onChange={(e) => setPincode(e.target.value)}/>
                            </div>
                        </div>
                </div>
                <div className="requestDetails">
                    <div className="subjectContainer">
                        <label>Subject: </label>
                        <input
                         defaultValue={requestSubject}
                         onChange={(e) => setRequestSubject(e.target.value)}
                         className="requestSubject"
                         required="true"
                         />
                    </div>
                    <textarea className="requestContent"
                     defaultValue={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    ></textarea>
                </div>
                <button  className="btn draft" onClick={handleDraft}>Save Draft <i className="fas fa-file-download"></i></button>
                <button to="/dashboard" className="btn delete" onClick={handleDelete}> Delete <i className="fas fa-trash"></i></button>
                <button  className="btn submit" onClick={handleUpdate}>Submit</button>
            </div>
        </div>
    )
}
