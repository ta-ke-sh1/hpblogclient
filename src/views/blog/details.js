import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { textShuffle } from "../../utils/utils";
import { gsap } from "gsap";

export default function BlogDetails({ props }) {
  const posterTrackContainer = useRef(null);
  const blogTitle = useRef(null);
  const [lastIndex, setLast] = useState(-1);
  const [posters, setPosters] = useState([]);

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

  useEffect(() => {

    let icon = document.getElementById('svg-cursor-icon')
    if (icon) {
      gsap.to(icon, {
        transform: 'rotate(0deg)',
        duration: 0.4,
        ease: "power",
      })
    }
  });

  let interval = null;

  const titleOnMouseOver = (index) => {

    let title = document.getElementById("poster-title-" + index);
    let textContent = title.getAttribute("data-original-text");
    textShuffle(title, textContent, interval, 300 / posterContent[index].name.length);

    let newDiv = imageDiv(index);
    if (index !== lastIndex && posters.length < 5) {
      setLast(index);
      setPosters([...posters, newDiv]);
    } else {
      setLast(index);
      setPosters([...posters, newDiv].slice(1));
    }
  };

  const trackOnMouseEnter = () => {
    let outer = document.getElementById('outer-circle')
    let text = document.getElementById('cursor-text');
    cursorMagnify(outer, text);
  }

  const trackOnMouseLeave = () => {
    let outer = document.getElementById('outer-circle')
    let text = document.getElementById('cursor-text');
    cursorNormal(outer, text);
  }

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      className="custom-wrapper"
      transition={{
        duration: 0.75,
        ease: "easeOut",
      }}
    >
      <div className="blog-details-wrapper">
        <div className="blog-text med">
          <p id="blog-title" ref={blogTitle}>
            30 days
          </p>
        </div>
        <div className="blog-details-content">
          <div className="track" ref={posterTrackContainer} id="posters-track" onMouseEnter={() => trackOnMouseEnter()} onMouseLeave={() => trackOnMouseLeave()}>
            {numbers.map((i, index) => {
              return (
                <div className="poster-title" key={"poster-" + index}>
                  <h1 onMouseEnter={() => titleOnMouseOver(index)} className="blog-title noselect" id={"poster-title-" + index} data-original-text={posterContent[index].name}>
                    {posterContent[index].name.toLowerCase()}
                  </h1>
                  <span className="title-number med noselect">({index + 1})</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="blog-image-container">
          <div className="poster-holder">{posters.map((poster, index) => <div key={"poster-" + index} className="blog-img">{poster}</div>)}</div>
        </div>
        <div className="navigation-guide med">
          <p>Scroll</p>
        </div>
      </div>
    </m.div>
  );
}

const imageDiv = (i) => {
  return (

    <img
      alt="flower"
      className="img-div"
      src={process.env.PUBLIC_URL + "/projects/30_days/day " + (i + 1) + ".jpg"}
      style={{
        transform: "rotate(" + randomNumberInRange(-20, 20) + "deg)",
      }}
    />

  );
};

function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
