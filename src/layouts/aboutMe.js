import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StoryCard from "../components/card/storyCard";
import { randomInteger } from "../utils/utils";
import { gsap } from "gsap";
import { hightlightSpanOver, removeHighlighSpanOver } from "../utils/utils";

const img = <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/me.webp"})` }} id="about-img"></div>;

export default function AboutMe() {
  const overContainer = useRef(null);

  const [cards, setCards] = useState([]);

  const timeline = useRef();

  const images_dir = [
    "/about/cropped.jpg",
    "",
    "",
  ]

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

    let maxWidth = (window.innerWidth * (100 - width)) / 100;
    let maxHeight = (window.innerHeight * (100 - height - 10)) / 100;

    let pos = {
      x: randomInteger(20, maxWidth),
      y: randomInteger(20, maxHeight),
    };

    let newCard =
      <div key={title}>
        <StoryCard id={"card-" + index} className={"draggable"} pos={pos} title={title} width={width} height={height} />
      </div>

    for (var i = 0; i < cards.length; i++) {
      console.log(cards[i].key)
      if (cards[i].key === title) {
        cards.splice(i, 1);
        setCards([...cards]);
        return;
      }
    }

    setCards([...cards, newCard]);
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

  const navItemMouseEnter = (id) => {
    hightlightSpanOver(document.getElementById("dot-sign-" + id))
  }

  const navItemMouseLeave = (id) => {
    removeHighlighSpanOver(document.getElementById("dot-sign-" + id))
  }


  return (
    <div className="about-container">
      <div style={{
      }} ref={overContainer} onMouseOver={() => trackOnMouseEnter()} onMouseLeave={() => trackOnMouseLeave()} onMouseDown={() => trackOnMouseDown()} onMouseUp={() => trackOnMouseUp()} >
        {cards}
      </div>
      <div className="contact-container">
        <Grid container columns={12}>
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
        <Grid container columns={12}>
          <Grid item xs={12} md={4} style={{
            textAlign: "justify"
          }}>
            <p> I'm a freshly graduated code writer.</p>
            <p>
              Currently working as a backend developer but exploring boundaries of visual experience is what piques my interest.
            </p>
            <p>
              [folio. 01] was made during my lunch break as a daily stress relief dose.
            </p>
          </Grid>
          <Grid item xs={12} md={2} >

          </Grid>
          <Grid item xs={12} md={3}>
            <p>Contact</p>
            <p>
              ha.the.trung.1698@gmail.com
            </p>
            <p>
              +(84) 818 16 1998
            </p>
            <br />
            <p>facebook</p>
            <p>instagram</p>
            <p>github</p>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="about-image-container">
              <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/me.webp"})` }} id="about-img"></div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="bottom-div">
        <Grid container columns={12}>
          <Grid item xs={12} sm={2}>
            <div
              className="details-text med"
              style={{ marginLeft: "1.5vw" }}
              onClick={() => handleZoomIn(1, "Story", 50)}
              onMouseEnter={() => { navItemMouseEnter(3) }}
              onMouseLeave={() => { navItemMouseLeave(3) }}>
              [ <span id="dot-sign-3">➌</span> Story ]
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div
              className="details-text med"
              onClick={() => handleZoomIn(1, "Experience", 50)}
              onMouseEnter={() => { navItemMouseEnter(4) }}
              onMouseLeave={() => { navItemMouseLeave(4) }}>
              [ <span id="dot-sign-4">➍</span> Experience ]
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div
              className="details-text med"
              onClick={() => handleZoomIn(1, "Awards", 50)}
              onMouseEnter={() => { navItemMouseEnter(5) }}
              onMouseLeave={() => { navItemMouseLeave(5) }}>
              [ <span id="dot-sign-5">➎</span> Awards ]
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
