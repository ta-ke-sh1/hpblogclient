import { Grid } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { usePreloader } from "../../animation/preloader";

export default function BlogDetails({ props }) {
  const preloader = usePreloader();
  const main = useRef(null);

  const data = {
    title: "White Collection",
    date: "Aug, 2018",
    description: "A set of illustration",
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
          backgroundImage: `url(https://images.pexels.com/photos/18249749/pexels-photo-18249749/free-photo-of-dawn-landscape-sunset-man.jpeg)`,
        }}
      >
        <Grid container columns={12}>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={3}>
            <h1
              className="s-128 display"
              style={{
                lineHeight: "6.75rem",
              }}
            >
              {data.title}
            </h1>
            <p>{data.date}</p>
            <p>{data.description}</p>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
      </div>
    </div>
  );
}
