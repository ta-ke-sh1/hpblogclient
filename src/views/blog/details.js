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
    <div
      ref={main}
      id={"eye-move-area"}
      style={{
        overflow: "scroll",
        height: "100vh",
      }}
    >
      <div
        className="custom-container blog-details"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundImage: `url(${process.env.PUBLIC_URL}/gradients/4.jpg)`,
        }}
      >
        <div className="details-title">
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
              <Chip title={chip} variant="outlined" />
            ))}
          </p>
        </div>
        <Grid container columns={12}>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </div>
    </div>
  );
}

const Chip = (props) => {
  return (
    <div className={"chip " + props.variant} style={{ ...props.sx }}>
      <div className="chip-content"> {props.title}</div>
    </div>
  );
};
