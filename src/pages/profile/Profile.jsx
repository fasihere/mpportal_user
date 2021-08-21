import './profile.scss'
import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { IDUKKI_DATA } from '../register/laList'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'


export default function Profile() {
    const [success,setSuccess] = useState(false)
    const [edit, setEdit] = useState(false)
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/users/'

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
    const [selectedLa, setSelectedLa] = useState()
    const [selectedPanchayat, setSelectedPanchayat] = useState()
    const [selectedWard, setSelectedWard] = useState()
    const [storedLa, setStoredLa] = useState("")
    const [storedPanchayat, setStoredPanchayat] = useState("")
    const [storedWard, setStoredWard] = useState()

    useEffect(() => {
        const getUser = async() => {
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            const res = await axios.get(baseUrl, config);
            setName(res.data.name)
            setEmail(res.data.email)
            setMobileNo(res.data.mobileNo)
            setAddress(res.data.address)
            setPincode(res.data.pincode)
            setStoredLa(res.data.assembly)
            setStoredPanchayat(res.data.panchayat)
            setStoredWard(res.data.ward)
         }
         getUser()
    },[])

    const handleEdit = async (e) => {
        e.preventDefault()
        setEdit(!edit)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //dispatch({ type: "UPDATE_START" });
        setEdit(!edit)
        var assembly = selectedLa
        var panch = selectedPanchayat
        var ward = selectedWard
        if(!assembly){
            assembly = storedLa
        }
        if(!panch){
            panch = storedPanchayat
        }
        if(!ward){
            ward = storedWard
        }
        setStoredLa(assembly)
        setStoredPanchayat(panch)
        setStoredWard(ward)
        const body = {
            name,
            email,
            address,
            assembly,
            panchayat:panch,
            ward,
            pincode
        };
        const config = {
            headers: {
              'Authorization':'Bearer '+ await user.getIdToken()
            }
        }
        try {
         const res = await axios.patch(baseUrl, body, config);
         console.log(res)
         setSuccess(true);
        } catch (err) {
            console.log(err)
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
        <div className="profile">
            <h2 className="title">Profile</h2>
            <div className="wrapper">
                <div className="left">
                    <form onSubmit={handleSubmit}>
                        {
                            edit?(
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
                                        <span>LokSabha Constituency :</span>
                                        <span>Idukki</span>
                                    </div>
                                    <div className="inputItem">
                                        <label>LA Constituency:</label>
                                        <select value={selectedLa} onChange={(e) => changeLa(e)}>
                                            <option selected disabled>-- Select --</option>
                                            {la.map(x => {
                                                return <option>{x.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="inputItem">
                                        <label>Panchayat:</label>
                                        <select value={selectedPanchayat} onChange={(e) => changePanchayat(e)}>
                                            <option selected disabled>-- Select --</option>
                                            {panchayat.map(x => {
                                                return <option>{x.panchayat[0]}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="inputItem">
                                        <label>Ward:</label>
                                        <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                                            <option selected disabled>-- Select --</option>
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
                            ) : (
                            <div className="inputContainer">
                                <div className="inputItem">
                                    <span>Name :</span>
                                    <span>{name}</span>
                                </div>
                                <div className="inputItem">
                                    <span>Email :</span>
                                    <span>{email}</span>
                                </div>
                                <div className="inputItem">
                                    <span>LokSabha Constituency :</span>
                                    <span>Idukki</span>
                                </div>
                                <div className="inputItem">
                                    <span>LA Constituency :</span>
                                    <span>{storedLa}</span>
                                </div>
                                <div className="inputItem">
                                    <span>Panchayat :</span>
                                    <span>{storedPanchayat}</span>
                                </div>
                                <div className="inputItem">
                                    <span>Ward :</span>
                                    <span>{storedWard}</span>
                                </div>
                                <div className="inputItem">
                                    <span>Address :</span>
                                    <p>{address}</p>
                                </div>
                                <div className="inputItem">
                                    <span>Pincode :</span>
                                    <span>{pincode}</span>
                                </div>
                            </div>
                            )
                        }
                        {
                    edit ? (
                        <button className="btn save" onClick={handleSubmit}>Save <i className="fas fa-edit"></i></button>
                    ) : (
                        <button className="btn edit" onClick={handleEdit}>Edit <i className="fas fa-edit"></i></button>
                    )
                }
                    </form>

                </div>
                {/* <div className="right">
                    <h2 className="title">Request Summary</h2>
                    <div className="pendingNum">
                        <span className="indicator"></span>
                        <span>Pending Requests: 3 </span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
