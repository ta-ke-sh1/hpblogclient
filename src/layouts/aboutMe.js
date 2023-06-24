import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StoryCard from "../components/card/storyCard";
import { randomInteger } from "../utils/utils";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const story = (
  <>
    <div style={{ marginBottom: "15px" }}>
      <svg width="323" height="135" viewBox="0 0 323 135" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.518 98.69C12.354 98.69 1.136 89.176 0 72.704H11.786C13.348 85.484 21.868 89.034 32.802 89.034C44.872 89.034 49.842 83.78 49.842 76.964C49.842 68.728 44.162 66.598 30.672 63.758C16.188 60.776 3.266 57.794 3.266 41.748C3.266 29.536 12.638 21.584 29.678 21.584C47.854 21.584 56.8 30.246 58.504 44.588H46.718C45.582 34.932 40.328 30.672 29.394 30.672C18.886 30.672 14.626 35.358 14.626 41.18C14.626 49.132 21.726 50.694 34.364 53.25C49.132 56.232 61.486 59.498 61.486 76.396C61.486 91.164 49.416 98.69 32.518 98.69Z" fill="#F8F8F8" />
        <path d="M66.4238 32.518V23.146H77.0738V0H88.5758V23.146H102.776V32.518H88.5758V80.23C88.5758 85.342 91.2738 87.046 95.9598 87.046C98.2318 87.046 100.788 86.478 102.066 86.052H102.492V95.992C99.7938 96.56 96.6698 96.986 93.2618 96.986C83.8898 96.986 77.0738 93.152 77.0738 82.786V32.518H66.4238Z" fill="#F8F8F8" />
        <path d="M140.355 98.548C122.25 98.548 111.884 87.685 111.884 70.645C111.884 44.446 129.634 24.282 154.413 24.282C172.518 24.282 182.884 35.145 182.884 52.185C182.884 78.384 165.134 98.548 140.355 98.548ZM141.562 91.803C154.484 91.803 163.572 79.946 166.98 61.841C167.974 57.013 168.4 52.54 168.4 49.203C168.4 38.269 163.643 30.956 153.135 30.956C140.142 30.956 131.054 42.813 127.646 60.918C126.723 65.888 126.226 70.29 126.226 73.556C126.226 84.561 130.983 91.803 141.562 91.803Z" fill="#F8F8F8" />
        <path d="M219.958 96.56H194.372V90.1928H200.739V38.9819H194.372V32.5756H200.739V26.1694H207.146V19.7631H213.552V32.5756H219.958V38.9819H213.552V90.1928H219.958V96.56ZM245.544 38.9819H232.771V32.5756H219.958V26.1694H245.544V38.9819Z" fill="#F8F8F8" />
        <path d="M287.106 109.333H280.7V80.5834H274.294V64.5678H267.888V48.5913H261.521V32.5756H251.95V26.1694H283.903V32.5756H274.294V48.5913H280.7V64.5678H287.106V80.5834H293.513V96.56H287.106V109.333ZM312.692 48.5913H306.286V32.5756H296.716V26.1694H322.302V32.5756H312.692V48.5913ZM306.286 64.5678H299.919V48.5913H306.286V64.5678ZM299.919 80.5834H293.513V64.5678H299.919V80.5834ZM280.7 122.146H274.294V109.333H280.7V122.146ZM267.888 134.958H255.153V122.146H274.294V128.552H267.888V134.958Z" fill="#F8F8F8" />
      </svg>


    </div>
    <Grid container>
      <Grid item xs={6}>
        {" "}
        <p className="paragraph">
          Previously studied Business Japanese at Foreign Trade University of Vietnam, but it was not the right path for me.
          Realized that I had been tinkering with computer since the age of 3, so I studied software engineering.
        </p>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  </>
);

const img = <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/me.webp"})` }} id="about-img"></div>;

export default function AboutMe() {
  const hello = useRef(null);
  const rowContaier = useRef(null);
  const overContainer = useRef(null);

  const [addable, updateAddable] = useState(true);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCards([]);
    });
    gsap.registerPlugin(Draggable);
  }, []);

  const handleZoomIn = (index, title, width = 40, height = 30) => {
    if (addable) {
      updateAddable(false);
      let maxWidth = (window.innerWidth * (100 - width)) / 100;
      let maxHeight = (window.innerHeight * (100 - height)) / 100;

      let pos = {
        x: randomInteger(20, maxWidth),
        y: randomInteger(20, maxHeight),
      };

      let id = "window-" + Math.floor(Date.now());

      let newCard = <StoryCard className={"draggable"} key={id} id={id} pos={pos} children={story} title={title} width={width} height={height} />;

      if (cards.length < 5) {
        setCards([...cards, newCard]);
      } else {
        setCards([...cards, newCard].slice(1));
      }

      setTimeout(() => {
        updateAddable(true);
      }, 200);
    }
  };

  const handleZoomOut = () => { };

  return (
    <div className="about-container">
      <div className="fullpage" ref={overContainer} onClick={() => handleZoomOut()}>
        {cards}
      </div>
      <div className="center-align-text mb-20vh">
        <h1 className="title">
          <span ref={hello}>Hello!</span>
          <br />
          I'm a freshly graduated <br /> <span>code writer</span>
        </h1>
        <div className="row" ref={rowContaier}>
          <div className="button-container" id="btn-container-1">
            <div className="button" onClick={() => handleZoomIn(1, "Story", 30, 70)}>
              [ Story ]
            </div>
          </div>
          <div className="button-container">
            <div className="button" onClick={() => handleZoomIn(2, "Experience")}>
              [ Experience ]
            </div>
          </div>
          <div className="button-container">
            <div className="button" onClick={() => handleZoomIn(3, "Awards")}>
              [ Awards ]
            </div>
          </div>
          <div className="button-container">
            <div className="button" onClick={() => handleZoomIn(4, "Music")}>
              [ Music ]
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-div">
        <Grid container justify="space-between" columns={12}>
          <Grid item xs={12} sm={2}>
            <div className="details-text med" style={{ marginLeft: "1.5vw" }}>
              [ GitHub ]
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div className="details-text med">[ Instagram ]</div>
          </Grid>
          <Grid item xs={12} sm={2} display={"flex"} justifyContent="flex-end">
            <div className="details-text med">[ Facebook ]</div>
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid display="flex" justifyContent="space-between" item xs={12} sm={4}>
            <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
              (+84) 818 161 998
            </div>
            <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
              Send me an email
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
