import './intro.scss'

export default function Intro() {
    return (
        <div className="intro" id="intro">
            <div className="left">
                <h1>Write to your MP,<br /><span>Dean Kuriakose</span></h1>
                <button className="btn">Write Now</button>
            </div>
            <div className="right">
                <img src="public/assets/images/dean_img.jpeg"  width="100px" alt="" />
            </div>
        </div>
    )
}
