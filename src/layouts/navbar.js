import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function MenuOverlay() {

    const burgerNav = useRef(null);
    const desktopNav = useRef(null);
    const aboutNav = useRef(null);

    const [isOpenMenu, updateOpenMenu] = useState(false);
    const [isAnimating, updateAnimation] = useState(false);

    window.addEventListener('resize', () => {
        handleResize()
    })

    const handleResize = () => {
        if (window.innerWidth < 700) {
            // gsap.to(burgerNav.current, {
            //     duration: 0,
            //     opacity: 1,
            //     zIndex: 100000
            // })
            // gsap.to(desktopNav.current, {
            //     duration: 0,
            //     opacity: 0,
            //     zIndex: 10
            // })
        } else {
            // gsap.to(burgerNav.current, {
            //     duration: 0,
            //     opacity: 0,
            //     zIndex: 10
            // })
            // gsap.to(desktopNav.current, {
            //     duration: 0,
            //     opacity: 1,
            //     zIndex: 100
            // })
        }
    }

    useEffect(() => {
        handleResize();
        // gsap.to(aboutNav.current, {
        //     duration: 0,
        //     zIndex: 1,
        //     xPercent: 100,
        // });
    }, []);

    const openMenu = () => {
        if (isAnimating) {
            return;
        }
        updateAnimation(true);

        if (!isOpenMenu) {
            burgerAnimation(13, 45, 0.15);
            updateOpenMenu(true);
        } else {
            burgerAnimation(0, 0, 0.15);
            updateOpenMenu(false);
        }

        // gsap.to(aboutNav.current, {
        //     duration: 0.6,
        //     xPercent: isOpenMenu ? 100 : 0,
        //     ease: "easeOut",
        //     onComplete: () => updateAnimation(false),
        // });
    };

    const burgerAnimation = (y, r, duration) => {
        const first = document.getElementById("first-line");
        const second = document.getElementById("second-line");
        const third = document.getElementById("third-line");
        // gsap.to(first, {
        //     duration: duration,
        //     rotation: r,
        //     y: y,
        //     ease: "easeOut",
        // });

        // gsap.to(second, {
        //     duration: duration,
        //     opacity: isOpenMenu ? 1 : 0,
        //     ease: "easeOut",
        // });

        // gsap.to(third, {
        //     duration: duration,
        //     rotation: -r,
        //     y: -y,
        //     ease: "easeOut",
        // });
    };

    return (
        <>
            <div className="custom-nav">
                <Link style={{ textDecoration: 'none' }} to={"/"}>
                    <div className="nav-item" style={{ zIndex: 100000 }}>Phuong Ha</div>
                </Link>

                <div className="navigation-items-window" ref={desktopNav}>
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
                </div>

                {/* <div className="menu-icon" onClick={openMenu} ref={burgerNav}>
                    <span className="line" id={"first-line"}></span>
                    <span className="line" id={"second-line"}></span>
                    <span className="line" id={"third-line"}></span>
                </div> */}

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
            </div>
        </>
    );
}
