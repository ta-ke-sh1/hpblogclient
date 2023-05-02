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
    const titlesContainer = useRef(null);

    const min_left = 27.5;
    const max_right = 100 - min_left;

    useLayoutEffect(() => {
        initListeners();
        initBorders();
    }, []);

    const initBorders = () => {
        const items = document.querySelectorAll(`.image`);
        const titles = document.querySelectorAll(`.details-container`);
        for (let i = 0; i < items.length; i++) {
            gsap.to(items[i], {
                borderRadius: "15vmin",
                duration: 0,
            });
            gsap.to(titles[i], {
                transform: `translatey(${i * 20}px)`
            })
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
            e.wheelDelta / 240;
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
        });

        gsap.to(titlesContainer.current, {
            transform: `translatey(${-index * 40}px)`,
            duration: 1.,
        })
    };

    const animateOut = (index) => {
        gsap.to(item[index], {
            borderRadius: "15vmin",
            duration: 1.7,
            ease: "power2.out",
        });
    };

    const data = [
        { name: "DSC_0694.jpg", id: "3Y5469EzyslVhGUIITI6", "title": "Title 1", "date": "2022/07/01" },
        { name: "DSC_0614.jpg", id: "5hrTNEfX3Cpl4RIIrxr9", "title": "Title 2", "date": "2022/08/12" },
        { name: "DSC_0674.jpg", id: "9TIrW5pqtfC9cIKcG5fu", "title": "Title 3", "date": "2022/09/24" },
        { name: "DSC_0642.jpg", id: "ANnNgHEr7XJh8persKCy", "title": "Title 4", "date": "2022/10/07" },
        { name: "DSC_0662.jpg", id: "PwGLWPa4pgnw1rPS0i1t", "title": "Title 5", "date": "2022/11/15" },
        { name: "DSC_0458.jpg", id: "SSRFGiddYEQKjXtvLcJG", "title": "Title 6", "date": "2022/12/11" },
        { name: "DSC_0670.jpg", id: "SeteUHhdR8xQCoq7wCOX", "title": "Title 7", "date": "2023/01/14" },
        { name: "DSC_0628.jpg", id: "UsB7Lfshe03R79iMtKKm", "title": "Title 8", "date": "2023/01/17" },
        { name: "DSC_0627.jpg", id: "kRpZQW8Kh8mUqVk9zNuK", "title": "Title 9", "date": "2023/02/04" },
        { name: "DSC_0655.jpg", id: "klEXgZPBhOR6FTWvBSpo", "title": "Title 10", "date": "2023/03/01" },
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
            <div className="overflow">
                <div className="bottom-ui-container" ref={titlesContainer}>
                    {data.map((title, index) => (
                        <>
                            <div className="details-container" key={'title-' + index} id={'title-' + index}>
                                <div className="details-text">
                                    {title.title}
                                </div>
                                <div className="details-date">
                                    {title.date}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </m.div>
    );
}
