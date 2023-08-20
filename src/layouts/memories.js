/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from "react";
import { cursorMagnify, cursorNormal, textShuffle } from "../utils/utils";
import { motion as m } from "framer-motion";
import gsap from "gsap";
import { Grid, Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MarqueTrack from "../components/marques/Marque";

import $ from "jquery";
import FollowingEye from "../components/custom/eye";

const data = [
  {
    name: "30",
    id: "3Y5469EzyslVhGUIITI6",
    title: "Ftnss Trckr",
    year: "2023",
  },
  {
    name: "28",
    id: "9TIrW5pqtfC9cIKcG5fu",
    title: "expnse trckr",
    year: "2022",
  },
  {
    name: "26",
    id: "PwGLWPa4pgnw1rPS0i1t",
    title: "30 Days Poster",
    year: "2022",
  },
  {
    name: "4",
    id: "9TIrW5pqtfC9cIKcG5fu",
    title: "Snkr E-commerce",
    year: "2020",
  },
  {
    name: "5",
    id: "SSRFGiddYEQKjXtvLcJG",
    title: "Secret Society",
    year: "2019",
  },
  {
    name: "24",
    id: "SeteUHhdR8xQCoq7wCOX",
    title: "White Collection",
    year: "2018",
  },
  {
    name: "7",
    id: "ANnNgHEr7XJh8persKCy",
    title: "YRC Recruitment",
    year: "2017",
  },
];

export default function Memories() {
  //const { data, error, isLoaded } = useFetch(host_url + "/image");
  const navigate = useNavigate();
  const trackContainer = useRef(null);
  const container = useRef(null);
  const arrow = useRef(null);

  const [isMouseDown, setMouseDown] = useState(false);
  const isOnTrack = useRef(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const [item, setItem] = useState([]);

  const titlesContainer = useRef(null);
  const yearContainer = useRef(null);

  const min_left = 12.5;
  const max_right = 100 - min_left;

  useLayoutEffect(() => {
    initListeners();
    const images = document.querySelectorAll(`.image`);
    initBorders(images);
    const items = document.querySelectorAll(`.overflow-text`);
    initLineBorder(items);

    let icon = document.getElementById("svg-cursor-icon");
    gsap.to(icon, {
      transform: "rotate(90deg)",
      duration: 0.4,
      ease: "power",
    });

    initEye();
  }, [isOnTrack]);

  const initEye = () => {};

  const documentOnMouseEnter = () => {
    isOnTrack.current = true;
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    if (!isTransitioning) {
      cursorMagnify(outer, text);
    }
  };

  const initBorders = (items) => {
    if (window.innerWidth < 800) {
      gsap.to(trackContainer.current, {
        transform: `translate(${-min_left}%, -50%)`,
        duration: 0,
      });
    } else {
      gsap.to(trackContainer.current, {
        transform: `translate(-${min_left}%, -50%)`,
        duration: 0,
      });
    }
    setItem(items);
  };

  const initLineBorder = (items) => {
    for (let i = 0; i < items.length; i++) {
      gsap.to(items[i], {
        borderTop: window.innerWidth < 600 ? "1px solid black" : "0px solid black",
        duration: 0,
      });
    }
  };

  const initListeners = () => {
    container.current.onmousemove = (e) => handleMouseMove(e);
    container.current.onmousedown = (e) => handleMouseDown(e);
    container.current.onmouseup = () => handleOnUp();

    container.current.addEventListener("mousewheel", (e) => {
      handleMouseScroll(e);
    });

    window.addEventListener("resize", () => {
      const items = document.querySelectorAll(`.overflow-text`);
      initLineBorder(items);
      const images = document.querySelectorAll(`.image`);
      initBorders(images);
      updateAbsolutePosition(-10);
    });
  };

  const handleMouseScroll = (e) => {
    if (!isOnTrack.current) return;
    const nextPercentageUnconstrained = parseFloat(trackContainer.current.getAttribute("data-prev-percentage")) + e.wheelDelta / 240;
    const nextPercentage = window.innerWidth < 1000 ? Math.max(Math.min(nextPercentageUnconstrained, -20), -80) : Math.max(Math.min(nextPercentageUnconstrained, -min_left), -max_right);
    updateAbsolutePosition(nextPercentage);
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-prev-percentage", parseFloat(trackContainer.current.getAttribute("data-percentage")));
    }
  };

  const trackOnMouseLeave = () => {
    if (titlesContainer.current) {
      if (titlesContainer.current.innerHTML !== "folio. 01") {
        textShuffle(titlesContainer.current, "folio. 01", interval_1, 20);
        textShuffle(yearContainer.current, "2023", interval_2, 100);
      }
    }
  };

  const documentOnMouseLeave = () => {
    isOnTrack.current = false;
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    if (!isTransitioning) {
      cursorNormal(outer, text);
    }
  };

  const handleOnUp = () => {
    setMouseDown(false);
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-mouse-down-at", "0");
      trackContainer.current.setAttribute("data-prev-percentage", parseFloat(trackContainer.current.getAttribute("data-percentage")));
    }
  };

  const handleMouseDown = (e) => {
    setMouseDown(true);
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-mouse-down-at", e.clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (trackContainer.current) {
      if (trackContainer.current.getAttribute("data-mouse-down-at") === "0") return;
      const mouseDelta = parseFloat(trackContainer.current.getAttribute("data-mouse-down-at")) - e.clientX,
        maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -min_left;
      const nextPercentageUnconstrained = parseFloat(trackContainer.current.getAttribute("data-prev-percentage")) + percentage,
        nextPercentage = window.innerWidth < 1000 ? Math.max(Math.min(nextPercentageUnconstrained, -20), -80) : Math.max(Math.min(nextPercentageUnconstrained, -min_left), -max_right);
      updateAbsolutePosition(nextPercentage);
    }
  };

  const updateAbsolutePosition = (percentage) => {
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-percentage", percentage);

      gsap.to(trackContainer.current, {
        transform: `translate(${percentage}%, -50%)`,
        duration: 3.4,
        ease: "power2.out",
        fill: "forwards",
      });
    }
  };

  let interval_1 = null;
  let interval_2 = null;

  const animateIn = (index) => {
    if (isMouseDown) return;
    var image = document.getElementById(`image-div-${index}`);

    gsap.to(image, {
      duration: 2,
    });

    textShuffle(titlesContainer.current, data[index].title, interval_1, 20, 2);
    textShuffle(yearContainer.current, data[index].year, interval_2, 100);
  };

  const animateOut = (index) => {
    if (isMouseDown) return;

    var image = document.getElementById(`image-div-${index}`);
    gsap.to(image, {
      duration: 2,
    });
  };

  const handleNavigate = (index) => {
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    setTransitioning(true);
    cursorNormal(outer, text);
    navigate("/project/" + index);
    setTransitioning(false);
  };

  return (
    <>
      <m.div
        id={"eye-move-area"}
        onMouseEnter={() => documentOnMouseEnter()}
        onMouseLeave={() => documentOnMouseLeave()}
        style={{ overflow: "hidden", height: "100vh" }}
        ref={container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.75,
          ease: "easeOut",
        }}
      >
        {/* <MarqueTrack
          isReverse={false}
          width={100}
          style={{
            top: "75px",
          }}
        /> */}
        <div className="image-track" ref={trackContainer} id="memory-track" data-mouse-down-at="0" data-prev-percentage="0" data-percentage="0" onMouseUp={() => handleOnUp()}>
          <div className="entry-item">
            <h1>Hola,</h1>
            <p>Welcome to my folio. v1</p>
            <p>
              My name is Trung and I'm a freshly graduated code writer. <br />
              Although currently working as a back-end dev,
              <br />
              my side hobby is creating and exploring visuals of web.
            </p>
            <div className="heading-col"></div>
          </div>
          <div
            onMouseLeave={() => trackOnMouseLeave()}
            style={{
              display: "flex",
            }}
          >
            {data.map((image, index) => (
              <div onMouseEnter={() => animateIn(index)} onMouseLeave={() => animateOut(index)} onClick={() => handleNavigate(index)} className="img-container" id={`image-${index}`} key={`image-${index}`}>
                <img preserveAspectRatio="xMidYMid slice" id={`image-div-${index}`} className="image" src={`${process.env.PUBLIC_URL}/projects/30_days/day ` + image.name + `.jpg`} alt={image.name} draggable="false" />
              </div>
            ))}
          </div>

          <div className="outro-item">
            <h1>Contact me,</h1>
            <p>Let's get in touch!</p>
          </div>
        </div>
        {/* <MarqueTrack
          isReverse={true}
          width={100}
          style={{
            bottom: "85px",
          }}
        /> */}
      </m.div>
      <Hidden lgDown={"md"}>
        <div className="bottom-div">
          <Grid container columns={12}>
            <Grid display="flex" item xs={12} sm={3} justifyContent="space-between">
              <div className="ideas-row-text med" style={{ marginLeft: "1.5vw" }}>
                [ Project :
              </div>
              <div className="ideas-row-text med">
                <span ref={titlesContainer}>folio. 01</span> ]
              </div>
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={4}>
              <div className="ideas-row-text med">
                [ Year : <span ref={yearContainer}>2023</span> ]{" "}
              </div>
            </Grid>
            <Grid display="flex" justifyContent="space-between" item xs={12} sm={4}>
              <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
                Scroll / Drag
              </div>
              <div className="arrow-row" id="arrow" ref={arrow}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 421.37 130.81">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path d="M0,68.91H408l-57,57,4.95,5,65.41-65.4L356,0,351,5l57,57H0m0,0v7" />
                      <polygon points="351.01 4.95 351.01 4.95 351.01 4.95 351.01 4.95" />
                    </g>
                  </g>
                </svg>
              </div>
              <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
                Explore
              </div>
            </Grid>
          </Grid>
        </div>
      </Hidden>
    </>
  );
}
