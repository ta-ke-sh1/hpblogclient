import React from "react";

export default function GradientMap(props) {
  return (
    <div className="entrance-image">
      {/* <video
                className="overlay"
                src={`${process.env.PUBLIC_URL + "/about/vid.mp4"}`}
                autoPlay
                loop></video> */}
      <img className="overlay" src={`${process.env.PUBLIC_URL + "/about/legend.gif"}`} />
    </div>
  );
}
