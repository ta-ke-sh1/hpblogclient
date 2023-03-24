import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function MenuOverlay() {
    const aboutMe = useRef(null);
    const [isOpenMenu, updateOpenMenu] = useState(false);
    const [isAnimating, updateAnimation] = useState(false);

    useEffect(() => {
        gsap.to(aboutMe.current, {
            duration: 0,
            zIndex: 1,
            xPercent: 100,
        });
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

        gsap.to(aboutMe.current, {
            duration: 0.6,
            xPercent: isOpenMenu ? 100 : 0,
            ease: "easeOut",
            onComplete: () => updateAnimation(false),
        });
    };

    const burgerAnimation = (y, r, duration) => {
        const first = document.getElementById("first-line");
        const second = document.getElementById("second-line");
        const third = document.getElementById("third-line");
        gsap.to(first, {
            duration: duration,
            rotation: r,
            y: y,
            ease: "easeOut",
        });

        gsap.to(second, {
            duration: duration,
            opacity: isOpenMenu ? 1 : 0,
            ease: "easeOut",
        });

        gsap.to(third, {
            duration: duration,
            rotation: -r,
            y: -y,
            ease: "easeOut",
        });
    };

    return (
        <>
            <div className="custom-nav">
                <div className="nav-item">Phuong Ha</div>

                <div className="menu-box"></div>
                <div className="menu-icon" onClick={openMenu}>
                    <span className="line" id={"first-line"}></span>
                    <span className="line" id={"second-line"}></span>
                    <span className="line" id={"third-line"}></span>
                </div>

                <div className="navigation-items" ref={aboutMe}>
                    <div
                        className="content-wrapper nav-item"
                        id="first-nav-item">
                        <div className="paragraph">my story</div>
                    </div>
                    <Link to={"/writings"}>
                        <div className="content-wrapper" id="first-second-item">
                            <div className="paragraph nav-item">
                                my writings
                            </div>
                        </div>
                    </Link>
                    <Link to={"/memories"}>
                        <div className="content-wrapper" id="first-third-item">
                            <div className="paragraph nav-item">my memories</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
