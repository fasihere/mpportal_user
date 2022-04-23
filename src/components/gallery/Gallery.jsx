import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Gallery() {
  const [value, setValue] = useState("IDUKKI_CARE");
  const [colNo, setColNo] = useState(4);

  // set ColNo to 2 when screen width is less than 768px
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setColNo(2);
    } else {
      setColNo(4);
    }
  };

  // call handleResize when window is resized
  window.addEventListener("resize", handleResize);

  useEffect(() => {
    handleResize();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="gallery" className="start1">
      <h1 className="h1">GALLERY</h1>
      <h6></h6>
      <Tabs value={value} onChange={handleChange} sx={{ margin: "0% 10%" }} variant="fullWidth">
        <Tab value="IDUKKI_CARE" label="Idukki Care" />
        <Tab value="IDUKKI_DISASTER" label="Idukki Disaster Management" />
        <Tab value="YOUTUBE_UPLOADS" label="Youtube Uploads" />
      </Tabs>
      <ImageList sx={{ height: 500, margin: "0% 10%" }} cols={colNo} gap={4} variant="quilted">
        {value === "YOUTUBE_UPLOADS" &&
          youtubeVideos.map((video) => (
            <ImageListItem key={video.id}>
              <iframe
                width={300}
                height={250}
                src={video.src}
                title={video.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </ImageListItem>
          ))}

        {value != "YOUTUBE_UPLOADS" &&
          itemData.map((item) => {
            if (item.type === value) {
              return (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar title={item.title} subtitle={item.author} sx={{ margin: "0px 10px -10px 10px" }} />
                </ImageListItem>
              );
            }
          })}
      </ImageList>
    </div>
  );
}

const youtubeVideos = [
  {
    id: "1",
    src: "https://www.youtube.com/embed/sDUGpQ1LY14",
    title: "Video 1",
  },
  {
    id: "2",
    src: "https://www.youtube.com/embed/d3qthzkX7E8",
    title: "Video 2",
  },
  {
    id: "3",
    src: "https://www.youtube.com/embed/rz5lQG1jjzQ",
    title: "Video 3",
  },
  {
    id: "4",
    src: "https://www.youtube.com/embed/PsW7rBIqJtU",
    title: "Video 4",
  },
  {
    id: "5",
    src: "https://www.youtube.com/embed/sDUGpQ1LY14",
    title: "Video 1",
  },
];

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    type: "IDUKKI_CARE",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
    type: "IDUKKI_CARE",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
    type: "IDUKKI_CARE",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    type: "IDUKKI_CARE",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    type: "IDUKKI_CARE",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    type: "IDUKKI_CARE",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
    type: "IDUKKI_CARE",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
    type: "IDUKKI_DISASTER",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    type: "IDUKKI_DISASTER",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
    type: "IDUKKI_DISASTER",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
    type: "IDUKKI_DISASTER",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    type: "IDUKKI_DISASTER",
    cols: 2,
  },
];
