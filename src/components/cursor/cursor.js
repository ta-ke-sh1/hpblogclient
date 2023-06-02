import $ from "jquery";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Cursor() {
    const inner = useRef(null);
    const outer = useRef(null);
    const text = useRef(null);

    useEffect(() => {
        $(function () {
            $(document).on("mousemove", (event) => {
                gsap.to(inner.current, {
                    left: event.clientX - 20,
                    top: event.clientY - 20,
                    duration: 0,
                    ease: "power",
                });
            });

            $(document).on("mousemove", (event) => {
                gsap.to(outer.current, {
                    left: event.clientX - 40,
                    top: event.clientY - 40,
                    duration: 0.6,
                    ease: "power",
                });
            });

            var h = text.current.offsetHeight;
            var w = text.current.offsetWidth;
            $(document).on("mousemove", (event) => {
                gsap.to(text.current, {
                    left: event.clientX - (w / 2),
                    top: event.clientY - (h / 2),
                    duration: 0.6,
                    ease: "power",
                });
            });

            var outerAnim = gsap.timeline({ paused: true }).to(outer.current, {
                opacity: 0,
                scale: 0,
                duration: 0.3,
                ease: "power1",
            });
            var innerAnim = gsap.timeline({ paused: true }).to(inner.current, {
                opacity: 0,
                scale: 0,
                duration: 0,
                ease: "none",
            });

            $(window)
                .on("mouseleave", () => {
                    innerAnim.play();
                    outerAnim.play();
                    gsap.to(text.current, {
                        opacity: 0,
                        duration: 0.2,
                        ease: "linear",
                    });
                })
                .on("mouseenter", () => {
                    innerAnim.reverse();
                    outerAnim.reverse();
                });

            $($(".image-track"))
                .on("mouseleave", () => {
                    normal()
                    gsap.to(text.current, {
                        opacity: 0,
                        duration: 0.2,
                        ease: "linear",
                    });
                }).on("mouseenter", () => {
                    magnify();
                    gsap.to(text.current, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power",
                    });
                }).on("mousedown", () => {
                    shrink()
                    gsap.to(text.current, {
                        opacity: 0,
                        duration: 0.2,
                        ease: "linear",
                    });
                }).on("mouseup", () => {
                    magnify();
                    gsap.to(text.current, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power",
                    });
                });
        });

    }, [])

    const normal = () => {
        gsap.to(outer.current, {
            scale: 1,
            duration: 0.3,
            ease: "power",
        });

    }

    const shrink = () => {
        gsap.to(outer.current, {
            scale: 0.4,
            duration: 0.3,
            ease: "power",
        });
    }

    const magnify = () => {
        gsap.to(outer.current, {
            scale: 4,
            duration: 0.3,
            ease: "power",
        });
    }

    return (
        <div>
            <span id="cursor-text" className="cursor-text reg" ref={text}>view</span>
            <span id="outer-circle" className="outer-circle" ref={outer}></span>
            <span id="circle" className="circle" ref={inner}></span>
        </div>
    );
}


