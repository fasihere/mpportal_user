import './intro.scss'
import { Link } from 'react-router-dom'

export default function Intro() {
    return (
        <div className="intro" id="intro">
            <div className="quote">
                   "Be the change that you wish to see in the world."<h5>~ MAHATMA GANDHI</h5>
            </div>
            <div className="bottom">           
                <img src="/assets/images/intro-dp.png" alt="dp"/>        
                <div  className="left">
                    <h1>Write to your MP,<br /><span>Dean Kuriakose</span></h1>
                    <Link className="btn link" to="/request/new">Write Now</Link>
                </div> 
            </div>
        </div>
    )
}