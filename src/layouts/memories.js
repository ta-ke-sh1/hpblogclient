/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from "react";
// import useFetch from "../hooks/useFetch";
import { host_url } from "../utils/utils";
import { motion as m } from "framer-motion";
import gsap from "gsap";

export default function Memories() {
    //const { data, error, isLoaded } = useFetch(host_url + "/image");

    const trackContainer = useRef(null);
    const container = useRef(null);

    const [isScrolling, setScrolling] = useState(false);

    const [item, setItem] = useState([]);

    const min_left = 27.5;
    const max_right = 100 - min_left;

    useLayoutEffect(() => {
        initListeners();
        initBorders();
    }, []);

    const initBorders = () => {
        const items = document.querySelectorAll(`.image`);
        for (let i = 0; i < items.length; i++) {
            gsap.to(items[i], {
                borderRadius: "15vmin",
                duration: 0,
                filter: "grayscale(100)",
            });
        }
        setItem(items);
    };

    const initListeners = () => {
        container.current.onmousemove = (e) => handleMouseMove(e);
        container.current.onmousedown = (e) => handleMouseDown(e);
        container.current.onmouseup = () => handleOnUp();
        container.current.addEventListener("mousewheel", (e) => {
            handleMouseScroll(e);
        });
        console.log("init");
    };

    const handleMouseScroll = (e) => {
        const nextPercentageUnconstrained =
            parseFloat(
                trackContainer.current.getAttribute("data-prev-percentage")
            ) +
            e.wheelDelta / 120;
        const nextPercentage = Math.max(
            Math.min(nextPercentageUnconstrained, -min_left),
            -max_right
        );
        updateAbsolutePosition(nextPercentage);
        trackContainer.current.setAttribute(
            "data-prev-percentage",
            parseFloat(trackContainer.current.getAttribute("data-percentage"))
        );
    };

    const handleOnUp = () => {
        trackContainer.current.setAttribute("data-mouse-down-at", "0");
        trackContainer.current.setAttribute(
            "data-prev-percentage",
            parseFloat(trackContainer.current.getAttribute("data-percentage"))
        );
    };

    const handleMouseDown = (e) => {
        trackContainer.current.setAttribute("data-mouse-down-at", e.clientX);
    };

    const handleMouseMove = (e) => {
        if (trackContainer.current.getAttribute("data-mouse-down-at") === "0")
            return;
        const mouseDelta =
                parseFloat(
                    trackContainer.current.getAttribute("data-mouse-down-at")
                ) - e.clientX,
            maxDelta = window.innerWidth / 2;
        const percentage = (mouseDelta / maxDelta) * -min_left,
            nextPercentageUnconstrained =
                parseFloat(
                    trackContainer.current.getAttribute("data-prev-percentage")
                ) + percentage,
            nextPercentage = Math.max(
                Math.min(nextPercentageUnconstrained, -min_left),
                -max_right
            );
        updateAbsolutePosition(nextPercentage);
    };

    const updateAbsolutePosition = (percentage) => {
        trackContainer.current.setAttribute("data-percentage", percentage);
        if (isScrolling) return;
        else {
            setScrolling(true);
            gsap.to(trackContainer.current, {
                transform: `translate(${percentage}%, -50%)`,
                duration: 2,
                ease: "power2.out",
                fill: "forwards",
                onComplete: () => {
                    setTimeout(function () {
                        setScrolling(false);
                    }, 3500);
                },
            });

            for (const image of trackContainer.current.getElementsByClassName(
                "image"
            )) {
                gsap.to(image, {
                    objectPosition: `${100 + min_left + percentage}% center`,
                    duration: 2,
                    ease: "power2.out",
                    fill: "forwards",
                });
            }
        }
    };

    const animateIn = (index) => {
        gsap.to(item[index], {
            borderRadius: "2vmin",
            duration: 0.7,
            ease: "power2.out",
            filter: "grayscale(0)",
        });
    };

    const animateOut = (index) => {
        gsap.to(item[index], {
            borderRadius: "15vmin",
            duration: 0.7,
            ease: "power2.out",
            filter: "grayscale(100)",
        });
    };

    const data = [
        { name: "DSC_0694.jpg", id: "3Y5469EzyslVhGUIITI6" },
        { name: "DSC_0614.jpg", id: "5hrTNEfX3Cpl4RIIrxr9" },
        { name: "DSC_0674.jpg", id: "9TIrW5pqtfC9cIKcG5fu" },
        { name: "DSC_0642.jpg", id: "ANnNgHEr7XJh8persKCy" },
        { name: "DSC_0662.jpg", id: "PwGLWPa4pgnw1rPS0i1t" },
        { name: "DSC_0458.jpg", id: "SSRFGiddYEQKjXtvLcJG" },
        { name: "DSC_0670.jpg", id: "SeteUHhdR8xQCoq7wCOX" },
        { name: "DSC_0628.jpg", id: "UsB7Lfshe03R79iMtKKm" },
        { name: "DSC_0627.jpg", id: "kRpZQW8Kh8mUqVk9zNuK" },
        { name: "DSC_0655.jpg", id: "klEXgZPBhOR6FTWvBSpo" },
    ];

    return (
        <m.div
            style={{ overflow: "hidden", height: "100vh" }}
            ref={container}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
                duration: 0.75,
                ease: "easeOut",
            }}>
            <div className="custom-container mt-70">
                <div className="custom-wrapper h-30 t-center">
                    <div className="center-div w-40">
                        <div className="custom-row">
                            <h1 className="display-font s-48 primary-color ml-5">
                                my memories{" "}
                            </h1>
                            <span className="display-font s-24 primary-color ml-5">
                                ({data.length})
                            </span>
                        </div>
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam pellentesque massa risus, vitae dictum
                            sem condimentum eu. Maecenas eu arcu ut elit feugiat
                            lobortis at id libero. Vestibulum tempus eros ac
                            diam ullamcorper elementum.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="image-track"
                ref={trackContainer}
                data-mouse-down-at="0"
                data-prev-percentage="0"
                data-percentage="0"
                onMouseLeave={() => handleOnUp()}>
                {data.map((image, index) => (
                    <img
                        onMouseEnter={() => animateIn(index)}
                        onMouseLeave={() => animateOut(index)}
                        className="image"
                        id={`image-${index}`}
                        key={`image-${index}`}
                        src={`${host_url + "/images/" + image.name}`}
                        alt={image.id}
                        draggable="false"
                    />
                ))}
            </div>
        </m.div>
    );
}
