import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Grid } from "@mui/material";
import Draggable from "react-draggable";
import { BothWays } from "../cursor/commonIcon";
import MarqueTrack from "../marques/Marque";

export default function StoryCard(props) {
  const storyCard = useRef(null);

  useEffect(() => {
    gsap.to(storyCard.current, {
      left: props.pos.x,
      top: props.pos.y,
      duration: 0,
    });
  });

  const cursorNormal = (outer, text) => {
    gsap.to(outer, {
      scale: 1,
      duration: 0.4,
      ease: "power",
    });
    gsap.to(text, {
      opacity: 0,
      duration: 0.2,
      ease: "power",
    });
  };

  const cursorMagnify = (outer, text) => {
    gsap.to(outer, {
      scale: 4,
      duration: 0.4,
      ease: "power",
    });
    gsap.to(text, {
      opacity: 1,
      duration: 0.2,
      ease: "power",
    });
  };

  const trackOnMouseEnter = () => {
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    cursorMagnify(outer, text);
  };

  const trackOnMouseLeave = () => {
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    cursorNormal(outer, text);
  };

  const trackOnMouseDown = () => {
    console.log("Down");
  };

  const trackOnMouseUp = () => {
    console.log("Up");
    document.getElementById("cursor-text").appendChild(document.createElement(<BothWays />));
  };

  const handleClose = () => {
    gsap.to(storyCard.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0,
    });
  };

  return (
    <Draggable onMouseDown={() => trackOnMouseDown()} onMouseUp={() => trackOnMouseUp()}>
      <div className={"story-card " + props.className} onMouseEnter={() => trackOnMouseEnter()} onMouseLeave={() => trackOnMouseLeave()} ref={storyCard} style={{ width: props.width + "vw" }}>
        <div className="control">
          <div className="story-title">{props.title}.txt</div>
          <button onClick={() => handleClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 71.21 71.21">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <polygon className="cls-1" points="71.21 8.9 62.31 0 35.61 26.7 8.9 0 0 8.9 26.7 35.61 0 62.31 8.9 71.21 35.61 44.51 62.31 71.21 71.21 62.31 44.51 35.61 71.21 8.9" />
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div className="content" style={{ maxHeight: props.height + "vh" }}>
          <MarqueTrack width={props.width} />
          <div className="content-padding">
            <>
              <div style={{ marginBottom: "15px" }}></div>
              <Grid container>
                <Grid item xs={4}>
                  {" "}
                  <p className="paragraph">
                    Previously studied Business Japanese at Foreign Trade University of Vietnam, yet somewhere along the line I realized that it was not the right path for me. So I enrolled into University of Greenwich and studied software engineering, mainly because I had been
                    tinkering with computer since the age of 3.
                  </p>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
