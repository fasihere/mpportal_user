import Intro from '../../components/intro/Intro'
import About from '../../components/about/About'
import './home.scss'
import Contact from '../../components/contact/Contact'

export default function Home() {
    return (
        <div className="home">
            <div className="sections">
                <Intro />
                <About />
            </div>
        </div>
    )
}
