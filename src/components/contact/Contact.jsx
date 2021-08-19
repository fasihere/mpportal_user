import './contact.scss'
import { Person, Mail } from '@material-ui/icons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Contact() {
    return (
        <div id="contact" className="start1">
            <h1 className="h1">CONTACT US</h1>
            <h6></h6>
            <Row className="top">

                <Col className="sec1" xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 1 }} >
                    <div className="icon"> <i class="fas fa-briefcase"></i></div>
                    <div className="heading">ADDRESS</div>
                    <h6></h6>
                    <ul>
                        <li>90, South Avenue, South Avenue Area, President's Estate, New Delhi, Delhi 110011, India
                        </li>
                        <li>Opp. PWD Guest House, Telephone Exchange Road, Thodupuzha P.O, Idukki district, Kerala, India - 685 584 </li>
                        <li>
                            Aalikunnel Building, Idukki Colony P.O, Cheruthoni, Idukki district, Kerala, India - 685 602
                        </li>
                    </ul>
                </Col>
                <Col className="map" md={{ span: 5, offset: 1 }}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3502.7920246653016!2d77.19684701508199!3d28.6060153824283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390ce2a6930989ab%3A0x6d62871fcf67dc58!2s90%2C%20South%20Ave%2C%20South%20Avenue%20Area%2C%20President&#39;s%20Estate%2C%20New%20Delhi%2C%20Delhi%20110011!3m2!1d28.6060154!2d77.1990357!5e0!3m2!1sen!2sin!4v1626114835194!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" title="map"></iframe>
                </Col>



            </Row>

            <Row >

                <Col xs={{ span: 12 }} md={{ span: 4, offset: 1 }} className="contact">
                    <h3 className="h3">GET IN TOUCH</h3>
                    <h6></h6>
                    <ul className="co">
                        <li className="coo"><Person className="icon" ></Person>
                            <span className="colo">+91 94478 77369</span>
                        </li>
                        <li className="coo">
                            <Mail className="icon" />
                            <a className="colo" href="https://mail.google.com/mail/u/0/#inbox">deankuriakosemp@gmail.com</a>
                        </li>

                        <li className="coo left1">
                            <a className="coo" href="https://www.instagram.com/" > <i class="fab fa-instagram"></i></a></li>

                        <li className="coo left1">
                            <a className="coo" href="https://www.facebook.com/"> <i class="fab fa-facebook"></i></a></li>
                        <li className="coo left1">
                            <a className="coo" href="https://www.youtube.com/"><i class="fab fa-youtube"></i></a></li>
                        <li className="coo left1"><a className="coo" href="https://www.twitter.com/"><i class="fab fa-twitter-square"></i></a>
                        </li>

                    </ul>
                </Col>
                <Col xs={{ order: "first" }} md={{ span: 4, offset: 1 }} >
                    <div className="mail" >
                        <img src="assets/images/undraw_contact_us_15o2.svg" />

                    </div>

                </Col>

            </Row>


        </div >

    )
}
