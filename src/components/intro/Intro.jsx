import './intro.scss'
import { Link } from 'react-router-dom'

export default function Intro() {
    return (
        <div className="intro" id="intro">
            <div className="left">
                <h1>Write to your MP,<br /><span>Dean Kuriakose</span></h1>
                <Link className="btn link" to="/request/new">Write Now</Link>
            </div>
            <div className="right">
            </div>
        </div>
    )
}
