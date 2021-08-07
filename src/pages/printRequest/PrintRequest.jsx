import { Link } from 'react-router-dom'
import './printRequest.scss'

export default function PrintRequest() {
    const baseUrl="/dashboard/view/"
    const reqId = "0209248"
    return (
        <div className="printRequest">
            <h2 className="title">Request Send <i className="fas fa-check-circle"></i></h2>
            <div className="wrapper">
                <div className="personalDetails">
                    <h2>Personal Details</h2>
                    <div className="inputContainer">
                        <div className="inputItem">
                            <span>Name :</span>
                            <span>123456</span>
                        </div>
                        <div className="inputItem">
                            <span>LokSabha Constituency :</span>
                            <span>123456</span>
                        </div>
                        <div className="inputItem">
                            <span>LA Constituency :</span>
                            <span>123456</span>
                        </div>
                        <div className="inputItem">
                            <span>Panchayat :</span>
                            <span>123456</span>
                        </div>
                        <div className="inputItem">
                            <span>Ward :</span>
                            <span>123456</span>
                        </div>
                        <div className="inputItem">
                            <span>Address :</span>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing el
                                it. Placeat, corrupti iste! Voluptate eum vel fugiat p
                                erferendis accusamus, ea veniam doloremque.
                            </p>
                        </div>
                        <div className="inputItem">
                            <span>Pincode :</span>
                            <span>123456</span>
                        </div>
                    </div>
                </div>
                <div className="requestDetails">
                    <div className="subjectContainer">
                        <span>Subject: </span>
                        <p className="requestSubject">This is the subject of the request</p>
                    </div>
                    <p className="requestContent">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad perspici
                        atis dolorem facilis magni mollitia, quisquam, dignissimos id accusantium dolor
                        e nulla porro autem suscipit. Nemo, sapiente inventore sit necessitatibus quisquam
                        voluptates neque nobis fuga ipsa quidem placeat quis architecto quasi expedita molest
                        iae nulla nisi cumque. Sit dolor incidunt eius molestiae veniam veritatis consequuntur 
                        laboriosam, maxime doloremque nobis minus quo quidem recusandae nam adipisci est amet 
                        exercitationem architecto labore a velit rerum tenetur eaque blanditiis. Rem neque libero,
                            possimus porro accusantium veritatis at veniam! Necessitatibus ratione rerum itaque iste 
                            aperiam suscipit debitis voluptatibus laborum reprehenderit rem nam, asperiores amet minus
                            magni nemo!
                    </p>
                </div>
                <Link to={baseUrl + reqId} className="btn view link">View <i className="fas fa-eye"></i></Link>
            </div>
        </div>
    )
}
