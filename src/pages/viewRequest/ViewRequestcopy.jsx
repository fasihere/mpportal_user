import { Link, useLocation } from 'react-router-dom'
import './viewRequestcopy.scss'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { storage } from "../../context/Firebase";
import { Box } from '@material-ui/core'


export default function ViewRequestcopy() {
    const { user } = useAuth()
    const [req, setReq] = useState()
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const baseUrl = 'https://asia-south1-mpportal-e9873.cloudfunctions.net/app/requests/'
    const tempDocArray= useRef()

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
                var storageRef = storage.ref(`mpportal/user/${user.phoneNumber.slice(3,13)}/${path}`);
                res && console.log(res.data.documents)
                res.data.documents.map((fileName) => {
                    storageRef.child(`/${fileName}`).getDownloadURL()
                    .then((url) => {
                        const newDoc = {
                            name: fileName,
                            url
                        }
                      tempDocArray.current.innerHTML += 
                        `<li>
                          <a href=${newDoc.url}>${newDoc.name}</a>
                        </li>`
                      
                        console.log("tdoc",tempDocArray)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                )
            } catch(err){
                console.log(err)
            }
        }
         getReq()
    },[])

    const printDocument = () => {
        const input = document.getElementById('divToSave');
        input.style.display = "block"
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            //window.open(pdf.output('bloburl','_blank'))
            pdf.save(`request-${path}.pdf`);
          })
          .then(() => {
            input.style.display = "none"
          })
      }
    if(!req){
        return (
            <div className="loadingContainer">
                <span></span>
                <span className="second"></span>
            </div>
        )
    }
    return (
      <div className="viewRequest" style={{ backgroundColor: "#dad0d0" }}>
        <Link to="/dashboard" className="btn back">
          <i className="fas fa-arrow-left"></i> Return
        </Link>
        <button className="btn download" onClick={printDocument}>
          Save <i className="fas fa-file-download"></i>
        </button>
        <div id="divToDisplay" className="mt4">
          <h2 className="title">#{path}</h2>
          <div className="wrapper">
            <span className="date">
              {req &&
                req.postedTime.slice(0, 10).split("-").reverse().join("-")}
            </span>
            <div className="subjectContainer">
              <span>Subject: </span>
              <p className="requestSubject">{req && req.requestSubject}</p>
            </div>
            <div className="sep"></div>
            <div className="personalDetails">
              <div className="inputContainer1">
                <span>Requested by,</span>
                <div className="inputItem">
                  <span className="name">{req && req.name}</span>
                </div>
                <div className="inputItem">
                  <span>LS Constituency :</span>
                  <span className="value">{req && req.loksabha}</span>
                </div>
                <div className="inputItem">
                  <span>LA Constituency :</span>
                  <span className="value">{req && req.assembly}</span>
                </div>
                <div className="inputItem">
                  <span>Panchayat :</span>
                  <span className="value">{req && req.panchayat}</span>
                </div>
                <div className="inputItem">
                  <span>Ward :</span>
                  <span className="value">{req && req.ward}</span>
                </div>
              </div>
              <div className="inputContainer2">
                <div className="inputItem">
                  <h5>Address :</h5>
                  <p>{req && req.address}</p>
                  <span>{req && req.pincode}</span>
                </div>
              </div>
            </div>
            <div className="sep"></div>
            <p className="requestContent">{req && req.requestBody}</p>
          </div>
        </div>
        <div
          id="divToSave"
          style={{
            backgroundColor: "white",
            width: "170mm",
            maxHeight: "297mm",
            fontSize: "15px",
            display: "none",
          }}
        >
          <h2 className="title">#{path}</h2>
          <div className="wrapper">
            <span className="date">
              {req &&
                req.postedTime.slice(0, 10).split("-").reverse().join("-")}
            </span>
            <div className="subjectContainer">
              <span>Subject: </span>
              <p className="requestSubject">{req && req.requestSubject}</p>
            </div>
            <div className="sep"></div>
            <div className="personalDetails">
              <div className="inputContainer1">
                <span>Requested by,</span>
                <div className="inputItem">
                  <span className="name">{req && req.name}</span>
                </div>
                <div className="inputItem">
                  <span>LS Constituency :</span>
                  <span className="value">{req && req.loksabha}</span>
                </div>
                <div className="inputItem">
                  <span>LA Constituency :</span>
                  <span className="value">{req && req.assembly}</span>
                </div>
                <div className="inputItem">
                  <span>Panchayat :</span>
                  <span className="value">{req && req.panchayat}</span>
                </div>
                <div className="inputItem">
                  <span>Ward :</span>
                  <span className="value">{req && req.ward}</span>
                </div>
              </div>
              <div className="inputContainer2">
                <div className="inputItem">
                  <h5>Address :</h5>
                  <p>{req && req.address}</p>
                  <span>{req && req.pincode}</span>
                </div>
              </div>
            </div>
            <div className="sep"></div>
            <p className="requestContent">{req && req.requestBody}</p>
          </div>
        </div>
        <div className="attachedDocs">
          <h3>Documents Attached</h3>
          <ul ref={tempDocArray}>
          </ul>
        </div>
      </div>
    );
}
