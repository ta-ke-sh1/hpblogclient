import React, { useRef, useEffect } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavigationMenu() {

    const navContainer = useRef();

    const initAnimation = () => {
        if (window.innerWidth < 1000) {
            navContainer.current.style.flexDirection = 'column';
        } else {
            navContainer.current.style.flexDirection = 'row';
        }
    }

    useEffect(() => {
        initAnimation();
        window.addEventListener('resize', () => {
            initAnimation();
        })
    }, []);

    const container = window.innerWidth < 1000 ? {
        open: {
            x: '-70px',
            y: '0%',
            transition: {
                ease: 'easeOut',
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        },
        closed: {
            y: '-100%',
            x: '-70px',
            transition: {
                ease: 'easeOut',
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    } : {
        open: {
            y: '0%',
            x: '-70px',
            transition: {
                ease: 'easeOut',
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        },
        closed: {
            y: '-100%',
            x: '-70px',
            transition: {
                ease: 'easeOut',
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    }

    const item = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: -50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    }

    return (
        <m.div
            transition={{
                duration: 0.5,
                ease: 'easeOut'
            }}
            className="navigation-items-window"
            variants={container}
            ref={navContainer}>
            <Link style={{ textDecoration: 'none' }} to={"/story"} >
                <m.div
                    className="content-wrapper nav-item"
                    id="first-nav-item" variants={item}>
                    <div className="paragraph">my story</div>
                </m.div>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={"/writings"}>
                <m.div className="content-wrapper" id="first-second-item" variants={item}>
                    <div className="paragraph nav-item" >
                        my writings
                    </div>
                </m.div>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={"/memories"}>
                <m.div className="content-wrapper" id="first-third-item" variants={item}>
                    <div className="paragraph nav-item">my memories</div>
                </m.div>
            </Link>
        </m.div>
    )
}