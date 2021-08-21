import "./media.scss";
import "animate.css";

export default function Media() {
  return (
    <div className="media-page">
      <h1>
        Mp 's youth agro mission
        <br />
        <span>2020</span>
      </h1>
      <hr />
      <div className="img-1">
        <img className="img1" src=".\assets\images\img1.jfif" alt="" />
      </div>
      <div className="flex-group">
        <div className="img-caption">
          <p>
            MP'S Youth Agro Mission 2020 is an initiative of Adv.Dean Kuriakose.
            This mission is a Joint Venture of Idukki Care Foundation and
            Congress(I) members of Idukki district to motivate the youth towards
            conventional and organic farming at Idukki district. Agro Mission
            was cordially Inaugurated on 01 June 2020, by Adv. Dean Kuriakose,
            in the presence of Roshy Augustine MLA and the members of Congress
            Mandalam Committee of Vazhathope, Idukki district on a one hectare
            property. Foundation has 75 volunteers across 75 panchayats of
            Idukki district. Through this mission, Idukki Care Foundation will
            be bringing forward more properties on rent for promoting
            conventional and organic agricultural activities at Idukki district
            in the coming days.
          </p>
        </div>
        <div data-aos="slide-up" className="img2-3 ">
          <img className="img2" src=".\assets\images\img2.jfif" alt="" />
          <img className="img3" src=".\assets\images\img3.jfif" alt="" />
        </div>
      </div>
      <h1 className="heading">
        RECENT MATTERS REPRESENTED BY <span>MP</span>
      </h1>{" "}
      <hr />
      <div className="videos">
        <div className="video-embed" data-aos="slide-up">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/PsW7rBIqJtU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h3>
            Medical Termination-Pregnancy Bill (Amendment)
            <br />
            <span>2020</span>
          </h3>
        </div>
        <div className="video-embed" data-aos="slide-up">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/rz5lQG1jjzQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h3>
            Matters of Urgent Public Importance
            <br />
            <span classsName="golden-span">Lok Sabha</span>
            <br />
            <span>2020</span>
          </h3>
        </div>
        <div className="video-embed" data-aos="slide-up">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/d3qthzkX7E8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h3>
            Matters of Urgent Public Importance
            <br />
            <span>Idukki Medical College</span>
          </h3>
        </div>
        <div className="video-embed" data-aos="slide-up">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/sDUGpQ1LY14"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h3>
            IDUKKI ELECTION RESULTS
            <br />
            <span>2019</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
