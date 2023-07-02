import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { BothWays, CanDragIcon } from "./commonIcon";

export default function CustomCursor(ref) {
  const outer = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
  }, []);

  function onMouseMove(event) {
    gsap.to(outer.current, {
      left: event.clientX - 25,
      top: event.clientY - 25,
      duration: 0.6,
      ease: "power",
    });

    gsap.to(text.current, {
      left: event.clientX - 50,
      top: event.clientY - 50,
      duration: 0.6,
      ease: "power",
    });
  }

  const onMouseLeave = () => {
    gsap.to(outer.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "none",
    });

    gsap.to(text.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "none",
    });
  };

  const onMouseEnter = () => {
    gsap.to(outer.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "none",
    });
  };

  return (
    <div>
      <span id="cursor-text" className="cursor-text reg" ref={text}>
        <div className="icon-wrapper">
          <BothWays />
          <CanDragIcon />
        </div>

      </span>
      <span id="outer-circle" className="outer-circle" ref={outer}></span>
    </div>
  );
}
