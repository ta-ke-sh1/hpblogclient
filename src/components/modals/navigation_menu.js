import React, { useRef, useEffect } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavigationMenu() {
  const navContainer = useRef();

  const initAnimation = () => {
    if (window.innerWidth < 1000) {
      navContainer.current.style.flexDirection = "column";
    } else {
      navContainer.current.style.flexDirection = "row";
    }
  };

  useEffect(() => {
    initAnimation();
    window.addEventListener("resize", () => {
      initAnimation();
    });
  }, []);

  const container = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
      },
    },
    closed: {
      y: -120,
      opacity: 0,
      transition: {
        ease: "easeOut",
      },
      zIndex: -1000000000,
    },
  };

  const item = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: -120,
      opacity: 0,
    },
  };

  return (
    <m.div
      transition={{
        duration: 2.5,
        ease: "easeOut",
      }}
      className="navigation-items"
      variants={container}
      ref={navContainer}
    >
      <Link style={{ textDecoration: "none" }} to={"/story"}>
        <m.div className="content-wrapper nav-item" id="first-nav-item" variants={item}>
          <div className="paragraph">Works (8)</div>
        </m.div>
      </Link>
      <Link style={{ textDecoration: "none" }} to={"/writings"}>
        <m.div className="content-wrapper" id="first-second-item" variants={item}>
          <div className="paragraph nav-item">About</div>
        </m.div>
      </Link>
      <Link style={{ textDecoration: "none" }} to={"/memories"}>
        <m.div className="content-wrapper" id="first-third-item" variants={item}>
          <div className="paragraph nav-item">Contact</div>
        </m.div>
      </Link>
    </m.div>
  );
}
