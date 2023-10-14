import { Grid } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { usePreloader } from "../../animation/preloader";

export default function BlogDetails({ props }) {
  const preloader = usePreloader();
  const main = useRef(null);

  const data = {
    title: "30 Days",
    date: "Aug, 2022",
    description: "A set of illustration for 30 days",
    tags: ["Illustration", "Poster Design"],
  };

  useEffect(() => {
    setTimeout(() => {
      preloader.tl.play();
    }, 1500);

    gsap.to(main.current, {
      y: 0,
    });
  }, []);

  return (
    <>
      <div
        className="custom-container blog-details"
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          left: "0",
          zIndex: -1,
          top: "0",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundImage: `url(${process.env.PUBLIC_URL}/gradients/4.jpg)`,
        }}
      ></div>
      <div
        className="blog-details"
        ref={main}
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          left: "0",
          zIndex: 100,
          top: "0",
        }}
      >
        <div className="details-title">
          <div className="title-container">
            <h1
              className="s-128 display"
              style={{
                lineHeight: "6.25rem",
              }}
            >
              {data.title}
            </h1>
            <p>[ {data.description} ]</p>
            <p className="chips-container">
              {data.tags.map((chip) => (
                <Chip key={"tag-" + chip} title={chip} variant="outlined" />
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="showcase-container">
        <Grid container spacing={4}>
          {numbers.map((i, index) => (
            <Grid className="grid-item" key={"blog-poster-" + posterContent[index].name} item xs={12} sm={6} md={4}>
              <div className="poster-title" key={"poster-" + index}>
                <img alt={process.env.PUBLIC_URL + "/projects/30_days/day " + (index + 1) + ".jpg"} className="img-div" src={process.env.PUBLIC_URL + "/projects/30_days/day " + i + ".jpg"} />
                <span className="title-number med noselect">({index + 1})</span>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

const Chip = (props) => {
  return (
    <div className={"chip " + props.variant} style={{ ...props.sx }}>
      <div className="chip-content"> {props.title}</div>
    </div>
  );
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

const posterContent = [
  {
    name: "Convergence",
    info: "",
  },
  {
    name: "Mars",
    info: "",
  },
  {
    name: "Manifest",
    info: "",
  },
  {
    name: "Sunburst",
    info: "",
  },
  {
    name: "Summertime",
    info: "",
  },
  {
    name: "Pressure",
    info: "",
  },
  {
    name: "Liberation",
    info: "",
  },
  {
    name: "Radical",
    info: "",
  },
  {
    name: "Solitude",
    info: "",
  },
  {
    name: "Accelerate",
    info: "",
  },
  {
    name: "Sunflower",
    info: "",
  },
  {
    name: "Conflict of Interest",
    info: "",
  },
  {
    name: "Polaroid",
    info: "",
  },
  {
    name: "Morning Coffee",
    info: "",
  },
  {
    name: "Labyrinth",
    info: "",
  },
  {
    name: "Existential",
    info: "",
  },
  {
    name: "Run!!!",
    info: "",
  },
  {
    name: "Disoriented",
    info: "",
  },
  {
    name: "Intertwined",
    info: "",
  },
  {
    name: "Psyched",
    info: "",
  },
  {
    name: "Daily Process",
    info: "",
  },
  {
    name: "Superfluid",
    info: "",
  },
  {
    name: "Void",
    info: "",
  },
  {
    name: "Diagnosis",
    info: "",
  },
  {
    name: "Where do we belong?",
    info: "",
  },
  {
    name: "Gradient",
    info: "",
  },
  {
    name: "Spacewalker",
    info: "",
  },
  {
    name: "Lost in Translation",
    info: "",
  },
  {
    name: "Break your limit",
    info: "",
  },
  {
    name: "El Paradiso",
    info: "",
  },
];
