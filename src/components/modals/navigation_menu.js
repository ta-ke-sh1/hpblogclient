import React from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
    open: {
        x: '0%'
    },
    closed: {
        x: '100%'
    }
}

export default function NavigationMenu() {
    return (
        <m.div
            className="navigation-items-window"
            variants={variants}
            transition={{
                duration: 0.6,
                ease: 'easeOut'
            }}>
            <Link style={{ textDecoration: 'none' }} to={"/story"}>
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
        </m.div>
    )
}