import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StoryCard from "../components/card/storyCard";
import { randomInteger } from "../utils/utils";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

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
      let maxHeight = (window.innerHeight * (100 - height - 10)) / 100;

      let pos = {
        x: randomInteger(20, maxWidth),
        y: randomInteger(20, maxHeight),
      };

      let id = "window-" + Math.floor(Date.now());

      let newCard = <StoryCard className={"draggable"} key={id} id={id} pos={pos} title={title} width={width} height={height} />;

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

  const handleZoomOut = () => {};

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
      </div>
      <div className="bottom-div">
        <Grid container justify="space-between" columns={12}>
          <Grid item xs={12} sm={2}>
            <div className="details-text med" style={{ marginLeft: "1.5vw" }} onClick={() => handleZoomIn(1, "Story", 50)}>
              [ Story ]
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div className="details-text med" onClick={() => handleZoomIn(1, "Story", 50)}>
              [ Experience ]
            </div>
          </Grid>
          <Grid item xs={12} sm={2} display={"flex"} justifyContent="flex-end">
            <div className="details-text med" onClick={() => handleZoomIn(1, "Story", 50)}>
              [ Awards ]
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div className="details-text med" onClick={() => handleZoomIn(1, "Story", 50)}>
              [ Contact ]
            </div>
          </Grid>
          <Grid display="flex" justifyContent="space-between" item xs={12} sm={4}>
            <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med"></div>
            <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
              Controls
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
