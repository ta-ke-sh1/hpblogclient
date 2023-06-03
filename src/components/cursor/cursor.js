import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Cursor() {
    const inner = useRef(null);
    const outer = useRef(null);
    const text = useRef(null);

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);
        var track = document.getElementById("memory-track");
        if (track) {
            track.addEventListener("mouseover", () => {
                magnify();
            });
            track.addEventListener("mouseleave", () => {
                normal();
            });
        }
        var blogTrack = document.getElementById("30-days-track");
        if (blogTrack) {
            blogTrack.addEventListener("mouseover", () => {
                magnify();
            });
            blogTrack.addEventListener("mouseleave", () => {
                normal();
            });
        }
    }, []);

    const onMouseMove = (event) => {
        gsap.to(inner.current, {
            left: event.clientX - 20,
            top: event.clientY - 20,
            duration: 0,
            ease: "power",
        });

        gsap.to(outer.current, {
            left: event.clientX - 40,
            top: event.clientY - 40,
            duration: 0.6,
            ease: "power",
        });
        gsap.to(text.current, {
            left: event.clientX - 65,
            top: event.clientY - 65,
            duration: 0.6,
            ease: "power",
        });
    };

    const onMouseLeave = () => {
        gsap.to(inner.current, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "none",
        });
        gsap.to(outer.current, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "none",
        });
    };

    const onMouseEnter = () => {
        gsap.to(inner.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "none",
        });
        gsap.to(outer.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "none",
        });
    };

    const normal = () => {
        gsap.to(outer.current, {
            scale: 1,
            duration: 0.4,
            ease: "power",
        });
        gsap.to(text.current, {
            opacity: 0,
            duration: 0.2,
            ease: "none",
        });
    };

    // const shrink = () => {
    //     gsap.to(outer.current, {
    //         scale: 0.4,
    //         duration: 0.3,
    //         ease: "power",
    //     });
    //     gsap.to(text.current, {
    //         opacity: 0,
    //         duration: 0.2,
    //         ease: "none",
    //     });
    // };

    const magnify = () => {
        gsap.to(outer.current, {
            scale: 4,
            duration: 0.4,
            ease: "power",
        });
        gsap.to(text.current, {
            opacity: 1,
            duration: 0.2,
            ease: "none",
        });
    };

    return (
        <div>
            <span id="cursor-text" className="cursor-text reg" ref={text}>
                <svg
                    width="80pt"
                    height="80pt"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg">
                    <g
                        fill="none"
                        stroke="#ffffff"
                        strokeMiterlimit="10"
                        strokeWidth="2">
                        <path transform="scale(50)" d="m5 6h13v13" />
                        <path transform="scale(50)" d="M 4.8 19.2 L 18 6 " />
                    </g>
                </svg>
            </span>
            <span id="outer-circle" className="outer-circle" ref={outer}></span>
            <span id="circle" className="circle" ref={inner}></span>
        </div>
    );
}
