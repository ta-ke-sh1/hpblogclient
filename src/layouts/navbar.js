import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as m, useCycle } from "framer-motion";
import { MenuToggle } from "../components/buttons/MenuToggle";
import { useDimensions } from "../hooks/useDimensions";
import NavigationMenu from "../components/modals/navigation_menu";

export default function MenuOverlay() {

    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    return (
        <m.nav
            className="custom-nav"
            initial={false}
            animate={isOpen ? "open" : 'closed'}
            ref={containerRef}
            custom={height}>

            <Link style={{ textDecoration: 'none' }} to={"/"}>
                <div className="nav-item" style={{ zIndex: 100000 }}>2023. Portfolio</div>
            </Link>
            <NavigationMenu />
            <MenuToggle toggle={() => toggleOpen()} />

            {/* <div className="navigation-items" ref={aboutNav}>
                    <div className="bottom-align">
                        <Link style={{ textDecoration: 'none' }} to={"/writings"}>
                            <div
                                className="content-wrapper nav-item"
                                id="first-nav-item">
                                <div className="paragraph">my story</div>
                            </div>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={"/writings"}>
                            <div className="content-wrapper" id="first-second-item">
                                <div className="paragraph nav-item">
                                    my writings
                                </div>
                            </div>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={"/memories"}>
                            <div className="content-wrapper" id="first-third-item">
                                <div className="paragraph nav-item">my memories</div>
                            </div>
                        </Link>
                    </div>
                </div> */}
        </m.nav >
    );
}
