import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MarqueTrack(props) {
  const svgContainer = useRef(null);

  useEffect(() => {
    marqueeInit();
  });

  const marqueeInit = () => {
    gsap.set(svgContainer.current.children, {
      x: (i) => i * 240,
    });

    gsap.to(svgContainer.current.children, {
      duration: 18,
      ease: "none",
      x: "+=2400", //move each box 500px to right
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 2400), //force x value to be between 0 and 500 using modulus
      },
      repeat: -1,
    });
  };

  return (
    <div className="marque-track" style={{ width: props.width + "vw", ...props.style, transform: props.isReverse ? "rotate(180deg)" : "rotate(0deg)" }}>
      <div className="svgs" style={{ position: "relative", left: "-220px" }} ref={svgContainer}>
        <Svg />
        <Svg />
        <Svg />
        <Svg />
        <Svg />
        <Svg />
        <Svg />
        <Svg />
        <Svg />
        <Svg />
      </div>
    </div>
  );
}

const Svg = (props) => {
  return (
    <svg width="240" height="80" viewBox="0 0 218 87" fill="none" xmlns="http://www.w3.org/2000/svg" className={"svg-box"}>
      <path
        d="M23.358 70.89C8.874 70.89 0.816 64.056 0 52.224H8.466C9.588 61.404 15.708 63.954 23.562 63.954C32.232 63.954 35.802 60.18 35.802 55.284C35.802 49.368 31.722 47.838 22.032 45.798C11.628 43.656 2.346 41.514 2.346 29.988C2.346 21.216 9.078 15.504 21.318 15.504C34.374 15.504 40.8 21.726 42.024 32.028H33.558C32.742 25.092 28.968 22.032 21.114 22.032C13.566 22.032 10.506 25.398 10.506 29.58C10.506 35.292 15.606 36.414 24.684 38.25C35.292 40.392 44.166 42.738 44.166 54.876C44.166 65.484 35.496 70.89 23.358 70.89Z"
        fill="black"
      />
      <path
        d="M47.7129 23.358V16.626H55.3629V0H63.6249V16.626H73.8249V23.358H63.6249V57.63C63.6249 61.302 65.5629 62.526 68.9289 62.526C70.5609 62.526 72.3969 62.118 73.3149 61.812H73.6209V68.952C71.6829 69.36 69.4389 69.666 66.9909 69.666C60.2589 69.666 55.3629 66.912 55.3629 59.466V23.358H47.7129Z"
        fill="black"
      />
      <path
        d="M99.8862 70.66C86.0022 70.66 79.2422 63.276 79.2422 51.316C79.2422 32.492 91.7742 18.66 109.766 18.66C123.598 18.66 130.41 26.044 130.41 38.004C130.41 56.828 117.878 70.66 99.8862 70.66ZM100.042 68.476C108.934 68.476 114.238 60.364 117.202 45.284C118.398 39.096 118.97 34.988 118.97 32.18C118.97 25.524 116.318 20.844 109.35 20.844C100.458 20.844 95.1542 28.956 92.2422 43.984C91.0462 50.224 90.4742 54.332 90.4742 57.14C90.4742 63.796 93.1262 68.476 100.042 68.476Z"
        fill="black"
      />
      <path
        d="M146.782 16.626V25.398H146.986C150.148 20.298 155.656 16.014 162.694 16.014C164.224 16.014 165.04 16.218 166.06 16.626V24.582H165.754C164.53 24.174 163.714 24.072 162.082 24.072C153.922 24.072 146.782 30.192 146.782 40.086V69.36H138.52V16.626H146.782Z"
        fill="black"
      />
      <path
        d="M180.215 86.802C177.053 86.802 175.013 86.598 172.769 85.68V78.336H173.177C174.299 78.948 176.033 79.458 178.787 79.458C182.255 79.458 184.601 78.132 186.641 73.032L188.681 67.83L168.077 16.626H177.053L189.497 49.47C191.129 53.856 193.067 59.772 193.067 59.772H193.271C193.271 59.772 195.107 53.856 196.739 49.47L208.775 16.626H217.547L195.005 73.644C190.721 84.558 186.641 86.802 180.215 86.802Z"
        fill="black"
      />
    </svg>
  );
};
