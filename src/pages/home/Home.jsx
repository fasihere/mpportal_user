import Intro from "../../components/intro/Intro";
import About from "../../components/about/About";
import "./home.scss";
import Contact from "../../components/contact/Contact";
import Gallery from "../../components/gallery/Gallery";

export default function Home() {
  return (
    <div className="home">
      <div className="sections">
        <Intro />
        <About />
        <Gallery />
        <Contact />
      </div>
    </div>
  );
}
