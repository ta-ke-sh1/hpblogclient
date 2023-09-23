import React from "react";

export default function GradientMap(props) {
  return (
    <div className="entrance-image">
      <img
        className="overlay"
        src={`${process.env.PUBLIC_URL + "/about/legend.gif"}`}></img>
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
