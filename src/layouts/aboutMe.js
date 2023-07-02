import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StoryCard from "../components/card/storyCard";
import { randomInteger } from "../utils/utils";
import { gsap } from "gsap";

const img = <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/me.webp"})` }} id="about-img"></div>;

export default function AboutMe() {
  const hello = useRef(null);
  const overContainer = useRef(null);

  const [addable, updateAddable] = useState(true);

  const [cards, setCards] = useState([]);

  const timeline = useRef();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCards([]);
    });

    let icon = document.getElementById("svg-cursor-icon");
    gsap.to(icon, {
      transform: "rotate(0deg)",
      duration: 0.4,
      ease: "power",
    });

    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");

    gsap.to(outer, {
      scale: 1,
      duration: 0,
      ease: "power",
    });
    gsap.to(text, {
      opacity: 0,
      duration: 0,
      ease: "power",
    });

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

      let newCard =
        <div >
          <StoryCard className={"draggable"} key={id} id={id} pos={pos} title={title} width={width} height={height} />
        </div>

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

  const initTimeline = async () => {
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    timeline.current = gsap.timeline().to(outer, {
      scale: 4,
      duration: 0.4,
      ease: "power",
    }, 0).to(text, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power",
    }, 0);
  }

  const trackOnMouseEnter = async () => {
    if (!timeline.current) {
      await initTimeline();
    }
    timeline.current.play();
  };

  const trackOnMouseLeave = async () => {
    if (!timeline.current) {
      await initTimeline();
    }
    timeline.current.reverse();
  };

  const trackOnMouseDown = () => {
    console.log("Down");
    let arrow = document.getElementById('svg-cursor-icon')
    let dragIcon = document.getElementById('svg-can-drag')
    gsap.to(arrow, {
      opacity: 0,
      duration: 0.2
    })
    gsap.to(dragIcon, {
      opacity: 1,
      duration: 0.2
    })
  };

  const trackOnMouseUp = () => {
    console.log("Up");
    let arrow = document.getElementById('svg-cursor-icon')
    let dragIcon = document.getElementById('svg-can-drag')
    gsap.to(arrow, {
      opacity: 1,
      duration: 0.2
    })
    gsap.to(dragIcon, {
      opacity: 0,
      duration: 0.2
    })
  };

  const handleClose = () => {
    setCards([]);
  }

  return (
    <div className="about-container">
      <div style={{
      }} ref={overContainer} onMouseOver={() => trackOnMouseEnter()} onMouseLeave={() => trackOnMouseLeave()} onMouseDown={() => trackOnMouseDown()} onMouseUp={() => trackOnMouseUp()} >
        {cards}
      </div>
      <Grid container columns={12} style={{ height: '100%' }}>
        <Grid item xs={12} md={6}>
          <h1 className="title noselect">
            <span ref={hello}>Hello!</span>
            <br />
            I'm a freshly graduated <br /> <span>code writer</span>
          </h1>
        </Grid>
      </Grid>
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
        </Grid>
      </div>
    </div>
  );
}
