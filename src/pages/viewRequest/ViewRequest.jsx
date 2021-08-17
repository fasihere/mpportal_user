import { Link, useLocation } from 'react-router-dom'
import './viewRequest.scss'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function ViewRequest() {
    const { user } = useAuth()
    const [req, setReq] = useState()
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/'

    useEffect(() => {
        const getReq = async() => {
            try{
                const config = {
                    headers: {
                      'Authorization':'Bearer '+ await user.getIdToken()
                    }
                }
                const res = await axios.get(baseUrl+path, config);
                res && setReq(res.data)
            } catch(err){
                console.log(err)
            }
         }
         getReq()
    },[path])

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          });
      }
    return (
        <div className="viewRequest">
            <Link to="/dashboard" className="btn back"><i className="fas fa-arrow-left"></i> Return</Link>
            <button className="btn download" onClick={printDocument}>Save <i className="fas fa-file-download"></i></button>
            <div id="divToPrint" className="mt4" style={{
                backgroundColor: '#f5f5f5',
                width: '210mm',
                minHeight: '297mm',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <h2 className="title">Issue: {path}</h2>
                <span className="date">{req && req.postedTime.slice(0,10).split("-").reverse().join("-")}</span>
                <div className="wrapper">
                    <div className="personalDetails">
                        <h2>Personal Details</h2>
                        <div className="inputContainer">
                            <div className="inputItem">
                                <span>Name :</span>
                                <span>{req && req.name}</span>
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
                </div>
            </div>
        </div>
    )
}
