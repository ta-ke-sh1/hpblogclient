import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion as m, useCycle } from "framer-motion";
import { MenuToggle } from "../components/buttons/MenuToggle";
import { useDimensions } from "../hooks/useDimensions";
import { Grid } from "@mui/material";
import { gsap } from "gsap";
import useModal from "../hooks/useModal";

export default function MenuOverlay() {
  const { isShowing, toggle } = useModal();

  const containerRef = useRef(null);
  const burgerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    initListener();
    gsap.to(containerRef.current, {
      opacity: window.innerWidth < 800 ? 0 : 1,
      duration: 0,
    });
  }, []);

  const initListener = () => {
    window.addEventListener("resize", () => {
      gsap.to(containerRef.current, {
        opacity: window.innerWidth < 800 ? 0 : 1,
        duration: 0.5,
      });
    });
  };

  return (
    <>
      <m.nav className="custom-nav" initial={false} custom={height}>
        <div ref={containerRef}>
          <m.div ref={burgerRef} animate={isOpen ? "open" : "closed"}>
            <Grid container columns={12}>
              <Grid item xs={12} sm={2}>
                <Link style={{ textDecoration: "none" }} to={"/"} className="nav-link">
                  <div className="nav-item med" style={{ zIndex: 10, color: "black" }}>
                    [ Trung. ]
                  </div>
                </Link>
              </Grid>
              <Grid item xs={12} sm={2}>
                <div className="nav-item med" style={{ zIndex: 10, color: "black" }}></div>
              </Grid>
              <Grid item xs={12} sm={2}>
                {/* <Link style={{ textDecoration: "none" }} to={"/about"} className="nav-link">
                  <div className="nav-item med" style={{ zIndex: 10, color: "black" }}>
                    [ About ]
                  </div>
                </Link> */}
              </Grid>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}></Grid>
            </Grid>

            <NavigationMenu />
            <MenuToggle onClick={toggle} toggle={() => toggleOpen()} />
          </m.div>
        </div>
      </m.nav>
    </>
  );
}

function NavigationMenu() {
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
        duration: 0,
        ease: "easeOut",
      },
      zIndex: 100000000000,
    },
    closed: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0,
        ease: "easeOut",
      },
      zIndex: -100000000000,
    },
  };

  const item = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 0,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
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
