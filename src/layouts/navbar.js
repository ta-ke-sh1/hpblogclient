import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion as m, useCycle } from "framer-motion";
import { MenuToggle } from "../components/buttons/MenuToggle";
import { useDimensions } from "../hooks/useDimensions";
import { Grid } from "@mui/material";
import NavigationMenu from "../components/modals/navigation_menu";
import { gsap } from "gsap";

export default function MenuOverlay() {
    const containerRef = useRef(null);
    const burgerRef = useRef(null)
    const { height } = useDimensions(containerRef);
    const [isOpen, toggleOpen] = useCycle(false, true);

    useEffect(() => {
        initListener();
        gsap.to(burgerRef.current, {
            zIndex: window.innerWidth < 800 ? 1000 : -1,
            opacity: window.innerWidth < 800 ? 1 : 0,
            duration: 0
        })
        gsap.to(containerRef.current, {
            opacity: window.innerWidth < 800 ? 0 : 1,
            duration: 0
        })
    }, []);

    const initListener = () => {
        window.addEventListener("resize", () => {
            gsap.to(burgerRef.current, {
                zIndex: window.innerWidth < 800 ? 1000 : -1,
                opacity: window.innerWidth < 800 ? 1 : 0,
                duration: 0.5
            })
            gsap.to(containerRef.current, {
                opacity: window.innerWidth < 800 ? 0 : 1,
                duration: 0.5
            })
        });
        console.log("init");
    }

    return (
        <>
            <m.nav
                className="custom-nav"
                initial={false}
                custom={height}>
                <div ref={containerRef}>
                    <Grid container columns={12}>
                        <Grid item xs={12} sm={2}>
                            <Link style={{ textDecoration: 'none' }} to={"/"}>
                                <div className="nav-item" style={{ zIndex: 10 }}> Trung.</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <div className="nav-item" style={{ zIndex: 10 }}>Works (8)</div>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Link style={{ textDecoration: 'none' }} to={"/"}>
                                <div className="nav-item" style={{ zIndex: 10 }}>About</div>
                            </Link>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="flex-end"
                            item xs={12} sm={2} >
                            <div className="nav-item" style={{ zIndex: 10 }}> Contact</div>
                        </Grid>
                    </Grid>
                </div>
                <m.div ref={burgerRef} animate={isOpen ? "open" : 'closed'}>
                    <Link style={{ textDecoration: 'none' }} to={"/"} className="custom-nav">
                        <div className="nav-item" style={{ zIndex: 10 }}> Trung.</div>
                    </Link>
                    <NavigationMenu />
                    <MenuToggle toggle={() => toggleOpen()} />
                </m.div>
            </m.nav >
        </>
    );
}
