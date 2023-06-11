import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

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
  };

  const onMouseLeave = () => {
    gsap.to(outer.current, {
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
        <svg xmlns="http://www.w3.org/2000/svg" id="svg-cursor-icon" height={100} width={100} viewBox="0 0 63.68 100.09"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="33.49 93.71 33.53 6.38 61.33 34.18 63.68 31.82 31.86 0 0.04 31.82 2.4 34.18 30.2 6.38 30.16 93.71 2.36 65.91 0 68.27 31.82 100.09 63.64 68.27 61.28 65.91 33.49 93.71" /></g></g></svg>
      </span>
      <span id="outer-circle" className="outer-circle" ref={outer}></span>
    </div>
  );
}
