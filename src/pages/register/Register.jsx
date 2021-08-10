import './register.scss'
import { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { IDUKKI_DATA } from './laList'

export default function Register() {
    
    const { user, auth } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState(null)
    const [error, setError] = useState(false)
    const [la, setLa] = useState([])
    const [panchayat, setPanchayat] = useState([])
    const [wards, setWards] = useState([])
    const [selectedLa, setSelectedLa] = useState()
    const [selectedPanchayat, setSelectedPanchayat] = useState()
    const [selectedWard, setSelectedWard] = useState()

    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/users'
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const body = {
                name,
                mobileNo: user.phoneNumber.slice(3,13),
                email,
                address,
                loksabha:"Idukki",
                assembly: selectedLa,
                panchayat: selectedPanchayat,
                ward: selectedWard,
                pincode
            }
            const config = {
                headers: {
                  'Authorization':'Bearer '+ await user.getIdToken()
                }
            }
            
            console.log(await user.getIdToken())
            const res = await axios.post(baseUrl + '/new', body, config);
            console.log(res)
            res && await auth.currentUser.updateProfile({
                displayName: name,
              }).then(() => {
                console.log("User has been registered")
              }).catch((error) => {
                console.log(error)
              });  
            res && window.location.replace("/dashboard")
        }
        catch(err){
            setError(true)
            console.log(err)
            console.log(err.response)
        }
    }
    
    
    const laList = useMemo(() => IDUKKI_DATA,[])
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
        <div className="register">
            <div className="wrapper">
                <div className="left">
                    <div className="info">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non 
                            odit iste necessitatibus, eveniet saepe autem, cupiditate vitae
                            sunt quasi deleniti tempore
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
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
                        <button type="submit" className="btn">Submit</button>
                    </form>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}
