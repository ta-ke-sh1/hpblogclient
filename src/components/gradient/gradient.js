import React from "react";

export default function GradientMap(props) {
  return (
    <div className="entrance-image">
      <video
        className="overlay"
        src={`${process.env.PUBLIC_URL + "/about/vid.mp4"}`}
        autoPlay
        loop></video>
    </div>
  );
}

const div = (
  <div className="entrance-image">
    <div className="isolate">
      <div className="overlay"></div>
    </div>
  </div>
);
