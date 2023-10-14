/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from "react";
import { cursorMagnify, cursorNormal, randomInteger, textShuffle } from "../utils/utils";
import { motion as m } from "framer-motion";
import gsap from "gsap";
import { Divider, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePreloader } from "../animation/preloader";
import GradientMap from "../components/gradient/gradient";
import { useDimensions } from "../hooks/useDimensions";
import MobileMain from "./mobile/mainMobile";
import MarqueTrack from "../components/marques/Marque";
import VerticalMarqueTrack from "../components/marques/vertical";

const data = [
  {
    name: "1",
    id: "3Y5469EzyslVhGUIITI6",
    title: "Ftnss Trckr",
    year: "2023",
  },
  {
    name: "2",
    id: "9TIrW5pqtfC9cIKcG5fu",
    title: "expnse trckr",
    year: "2022",
  },
  {
    name: "3",
    id: "PwGLWPa4pgnw1rPS0i1t",
    title: "30 Days Poster",
    year: "2022",
  },
  {
    name: "5",
    id: "SSRFGiddYEQKjXtvLcJG",
    title: "Soft Love Collection",
    year: "2018",
  },
  {
    name: "6",
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
  const preloader = usePreloader();
  //const { data, error, isLoaded } = useFetch(host_url + "/image");
  const navigate = useNavigate();
  const trackContainer = useRef(null);
  const container = useRef(null);

  const [isMouseDown, setMouseDown] = useState(false);
  const isOnTrack = useRef(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const titlesContainer = useRef(null);

  const { height, width } = useDimensions();

  useLayoutEffect(() => {
    setTimeout(() => {
      preloader.tl.play();
    }, 1500);

    console.log(height);
    console.log(width);

    initListeners();
    initBorders();
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

  const initBorders = () => {
    gsap.to(trackContainer.current, {
      transform: `translate(0%, -50%)`,
      duration: 0,
    });
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
    if (container.current) {
      container.current.onmousemove = (e) => handleMouseMove(e);
      container.current.onmousedown = (e) => handleMouseDown(e);
      container.current.onmouseup = () => handleOnUp();

      container.current.addEventListener("mousewheel", (e) => {
        handleMouseScroll(e);
      });
    }

    window.addEventListener("resize", () => {
      window.location.reload();
      const items = document.querySelectorAll(`.overflow-text`);
      initLineBorder(items);
      const images = document.querySelectorAll(`.image`);
      initBorders(images);
      updateAbsolutePosition(0);
    });
  };

  const handleMouseScroll = (e) => {
    if (!isOnTrack.current) return;
    const nextPercentageUnconstrained = parseFloat(trackContainer.current.getAttribute("data-prev-percentage")) + e.wheelDelta / 360;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    updateAbsolutePosition(nextPercentage);
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-prev-percentage", parseFloat(trackContainer.current.getAttribute("data-percentage")));
    }
  };

  const trackOnMouseLeave = () => {};

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
        maxDelta = window.innerWidth * 4;
      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = parseFloat(trackContainer.current.getAttribute("data-prev-percentage")) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      updateAbsolutePosition(nextPercentage);
    }
  };

  const updateAbsolutePosition = (percentage) => {
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-percentage", percentage);

      gsap.to(trackContainer.current, {
        transform: `translate(${percentage}%, -50%)`,
        duration: 2,
        ease: "power2.out",
        fill: "forwards",
      });
    }
  };

  const animateIn = (index) => {
    if (isMouseDown) return;
    let title = document.getElementById(`image-title-${index}`);
    textShuffle(title, data[index].title, null, 40, 2);
  };

  const animateOut = (index) => {
    if (isMouseDown) return;
    let title = document.getElementById(`image-title-${index}`);
    textShuffle(title, data[index].title, null, 40, 2);
  };

  const handleNavigate = (index) => {
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    setTransitioning(true);
    cursorNormal(outer, text);
    console.log(preloader);
    preloader.tl.reverse();
    setTimeout(() => {
      navigate("/project/" + index);
    }, 1500);

    setTransitioning(false);
  };
  return width > 800 ? (
    <>
      <GradientMap />
      <div
        className="outro-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/about/cropped.jpg"})`,
        }}
      ></div>
      <m.div className="main-track-container" onMouseEnter={() => documentOnMouseEnter()} onMouseLeave={() => documentOnMouseLeave()} style={{ overflow: "hidden", height: "100vh", top: 0 }} ref={container}>
        <div className="image-track" ref={trackContainer} id="memory-track" data-mouse-down-at="0" data-prev-percentage="0" data-percentage="0" onMouseUp={() => handleOnUp()}>
          <div
            className="entry-item"
            style={{
              width: "80vw",
            }}
          >
            <Grid container>
              <Grid item sm={12} md={1}></Grid>
              <Grid item sm={12} md={8}>
                <div className="relative">
                  <div className="center-div">
                    <div>
                      <div className="display-font s-128 title">Xin chào!</div>
                      <div className="introduction-paragraph">
                        <p>Welcome to Space. 01, I'm Trung Ha.</p>
                        <p>This is my personal space, portfolio and first ever launched product.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={1}></Grid>
              <Grid item sm={12} md={2}>
                <VerticalMarqueTrack isReverse={true} _svg={0} />
              </Grid>
            </Grid>
          </div>
          <div className="entry-item" style={{ marginRight: "100px", width: "80vw" }}>
            <Grid container spacing={4}>
              <Grid item sm={12} md={1}></Grid>
              <Grid item sm={12} md={10}>
                <div className="relative">
                  <div className="center-div">
                    <div>
                      <div className="introduction-paragraph">
                        <p>A freshly graduated code writer, and currently working as a back-end developer at Toshiba. However, my side-hobby is to create flashy & dope shits (who doesn't tbh).</p>
                        <p>This portfolio was made during my lunchbreaks as a method to keep myself fresh.</p>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={1}></Grid>
            </Grid>
          </div>
          <div
            onMouseLeave={() => trackOnMouseLeave()}
            style={{
              display: "flex",
            }}
          >
            {data.map((image, index) => (
              <div onMouseEnter={() => animateIn(index)} onMouseLeave={() => animateOut(index)} onClick={() => handleNavigate(index)} className="img-container" id={`image-${index}`} key={`image-${index}`}>
                <img preserveAspectRatio="xMidYMid slice" id={`image-div-${index}`} className="image" src={`${process.env.PUBLIC_URL}/gradients/` + image.name + `.jpg`} alt={image.name} draggable="false" />
                <div className="title-row">
                  <Grid container>
                    <Grid item xs={12}>
                      [0{index + 1}] - [{data[index].year}]
                    </Grid>
                    <Grid item xs={12}>
                      <div id={`image-title-${index}`}>{data[index].title}</div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            ))}
          </div>
          <ContactMe />
        </div>
      </m.div>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <div className="bottom-div">
          <Grid container columns={12}>
            <Grid display="flex" item xs={12} sm={3} justifyContent="space-between">
              <div className="ideas-row-text med">
                [ <span ref={titlesContainer}>space. 01</span> ]
              </div>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  ) : (
    <>
      <MobileMain />
    </>
  );
}

const ContactMe = () => {
  function sendMail() {
    var link = "mailto:ha.the.trung.1698@gmail.com" + "?cc=ha.the.trung.1698@gmail.com" + "&subject=" + encodeURIComponent("This is my subject") + "&body=" + encodeURIComponent(document.getElementById("myText").value);
    window.location.href = link;
  }

  return (
    <div className="outro-item">
      <Grid container>
        <Grid item sm={12} md={6}></Grid>
        <Grid item sm={12} md={6}>
          <Grid container>
            <h1 className="display-font s-64">Let's get in touch.</h1>
            <p id="myText">Feel free to drop me a line!</p>
            <Grid container>
              <Grid item sm={12} md={6}></Grid>
              <Grid item sm={12} md={6}></Grid>
              <Grid item sm={12} md={6}>
                <p>Hanoi</p>
              </Grid>
              <Grid item sm={12} md={3}>
                <p>
                  {new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Bangkok",
                  })}
                </p>
              </Grid>
            </Grid>
            <br />
            <Divider
              sx={{
                border: "0.5px solid #d6ff0a",
                marginBottom: "20px",
              }}
            />
            <h1 className="display-font s-64">Contact</h1>
            <Grid container>
              <Grid item sm={12} md={6} onClick={() => sendMail()}>
                <p>ha.the.trung.1698@gmail.com</p>
              </Grid>

              <Grid item sm={12} md={3}>
                <p>(+84) 818 16 1998</p>
              </Grid>
            </Grid>
            <br />
            <Divider
              sx={{
                border: "0.5px solid #d6ff0a",
                marginBottom: "20px",
              }}
            />
            <h1 className="display-font s-64">Social</h1>
            <Grid container>
              <Grid item sm={12} md={3}>
                <p>Facebook</p>
              </Grid>
              <Grid item sm={12} md={3}>
                <p>GitHub</p>
              </Grid>
              <Grid item sm={12} md={3}>
                <p>LinkedIn</p>
              </Grid>
              <Grid item sm={12} md={3}>
                <p>Behance</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
