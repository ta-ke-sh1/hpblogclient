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
    console.log("init");
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
                    {" "}
                    Trung.
                  </div>
                </Link>
              </Grid>
              <Grid item xs={12} sm={2}>
                <div className="nav-item med" style={{ zIndex: 10, color: "black" }}></div>
              </Grid>
              <Grid item xs={12} sm={2}>
                <div className="nav-item med" style={{ zIndex: 10, color: "black" }}>
                  Collected Works
                </div>
                <div className="nav-item reg" style={{ zIndex: 10, color: "black" }}>
                  2016-2023
                </div>
              </Grid>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}>
                <div className="nav-item med" style={{ zIndex: 10, color: "black" }}>
                  I just like to
                </div>
                <div className="nav-item reg" style={{ zIndex: 10, color: "black" }}>
                  create things.
                </div>
              </Grid>
            </Grid>

            {/* <NavigationMenu /> */}
            <MenuToggle onClick={toggle} />
          </m.div>
        </div>
      </m.nav>
    </>
  );
}
