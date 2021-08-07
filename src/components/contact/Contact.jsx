import './contact.scss'
import { Person, Mail } from '@material-ui/icons'

export default function Contact() {
    return (
        <div className="contact" id="contact">
            <div className="wrapper">
                <div className="left">
                    <h2>Offices of Dean Kuriakose</h2>
                    <div className="content">
                        <p>90, South Avenue, South Avenue Area, President's Estate, New Delhi, Delhi 110011, India</p>
                        <p>Opp. PWD Guest House, Telephone Exchange Road, Thodupuzha P.O, Idukki district, Kerala, India - 685 584 </p>
                        <p>Aalikunnel Building, Idukki Colony P.O, Cheruthoni, Idukki district, Kerala, India - 685 602</p>
                    </div>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>+91 94478 77369</span>
                    </div>
                    <div className="itemContainer">
                        <Mail className="icon"/>
                        <span><a href="deankuriakosemp@gmail.com">deankuriakosemp@gmail.com</a></span>
                    </div>
                </div>
                <div className="right">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3502.7920246653016!2d77.19684701508199!3d28.6060153824283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390ce2a6930989ab%3A0x6d62871fcf67dc58!2s90%2C%20South%20Ave%2C%20South%20Avenue%20Area%2C%20President&#39;s%20Estate%2C%20New%20Delhi%2C%20Delhi%20110011!3m2!1d28.6060154!2d77.1990357!5e0!3m2!1sen!2sin!4v1626114835194!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" title="map"></iframe>
                </div>
            </div>
        </div>
    )
}
