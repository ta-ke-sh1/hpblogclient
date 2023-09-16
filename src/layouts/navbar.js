import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { MenuToggle } from "../components/buttons/MenuToggle";
import { useDimensions } from "../hooks/useDimensions";
import { Grid, Divider } from "@mui/material";
import { gsap } from "gsap";
import useModal from "../hooks/useModal";
import FollowingEye from "../components/custom/eye";
import { usePreloader } from "../animation/preloader";

export default function MenuOverlay() {
  const { isShowing, toggle } = useModal();
  const navigate = useNavigate();
  const preloader = usePreloader();

  const containerRef = useRef(null);

  const burgerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, setOpen] = useState(false);

  const navContent = useRef(null);
  const navMenu = useRef(null);
  const navBg = useRef(null);

  useEffect(() => {
    initListener();
    gsap.to(containerRef.current, {
      opacity: window.innerWidth < 800 ? 0 : 1,
      duration: 0,
    });

    closeNav()
  }, []);

  const initListener = () => {
    window.addEventListener("resize", () => {
      gsap.to(containerRef.current, {
        opacity: window.innerWidth < 800 ? 0 : 1,
        duration: 0.5,
      });
    });
  };

  const openNav = () => {
    gsap.to(navMenu.current, {
      y: "0%",
      duration: 0,
      opacity: 1,
      ease: ease,
    });

    gsap.to(navBg.current, {
      opacity: 0.7,
      duration: 0.7,
      ease: ease,
    });

    gsap.to(navContent.current, {
      delay: 0.2,
      y: "0%",
      duration: 1,
      ease: ease,
    });
  }

  const closeNav = () => {
    gsap.to(navMenu.current, {
      y: "-100%",
      duration: 0,
      opacity: 0,
      delay: 1,
      ease: ease,
    });

    gsap.to(navBg.current, {
      opacity: 0,
      duration: 1,
      ease: ease,
    });

    gsap.to(navContent.current, {
      y: "-100%",
      delay: 0.1,
      duration: 0.9,
      ease: ease,
    });
  }

  const handlePageChange = () => {
    console.log(window.location.href);
    if (window.location.href !== "http://localhost:3000/") {
      preloader.tl.reverse();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const ease = "power";

  const toggleOpen = () => {
    if (isOpen) {
      // close
      closeNav()
    } else {
      // open
      openNav()
    }
    setOpen(!isOpen);
  };

  return (
    <>
      <m.nav className="custom-nav" initial={false} custom={height}>
        <div ref={containerRef}>
          <m.div ref={burgerRef} animate={isOpen ? "open" : "closed"}>
            <Grid container columns={12}>
              <Grid item xs={12} sm={2}>
                <Link style={{ textDecoration: "none" }} onClick={() => handlePageChange()} className="nav-link">
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

            <div className={"nav-menu"} ref={navMenu}>
              <div className="nav-content" ref={navContent}>
                <NavigationContent />
              </div>
              <div className="nav-background" ref={navBg} onClick={() => toggleOpen()} ></div>
            </div>
            <MenuToggle onClick={toggle} toggle={() => toggleOpen()} />
          </m.div>
        </div>
      </m.nav>
    </>
  );
}

const NavigationContent = () => {
  return (
    <div className="content-container">
      <h1 className="display-font s-64">Adios</h1>
      <Grid container>
        <Grid item sm={12} md={6}>
          <p>Hanoi</p>
        </Grid>
        <Grid item sm={12} md={3}>
          <p>
            {new Date().toLocaleString("en-US", {
              timeZone: "Asia/Bangkok",
            })}
          </p>
        </Grid>
      </Grid>
      <br />
      <Divider
        sx={{
          border: "0.5px solid #d6ff0a",
          marginBottom: "20px",
        }}
      />
      <h1 className="display-font s-64">Contact</h1>
      <Grid container>
        <Grid item sm={12} md={6}>
          <p>ha.the.trung.1698@gmail.com</p>
        </Grid>

        <Grid item sm={12} md={3}>
          <p>(+84) 818 16 1998</p>
        </Grid>
      </Grid>
      <br />
      <Divider
        sx={{
          border: "0.5px solid #d6ff0a",
          marginBottom: "20px",
        }}
      />
      <h1 className="display-font s-64">Social</h1>
      <Grid container>
        <Grid item sm={12} md={3}>
          <p>Facebook</p>
        </Grid>
        <Grid item sm={12} md={3}>
          <p>GitHub</p>
        </Grid>
        <Grid item sm={12} md={3}>
          <p>LinkedIn</p>
        </Grid>
        <Grid item sm={12} md={3}>
          <p>Behance</p>
        </Grid>
      </Grid>
    </div>
  );
};
