/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from "react";
// import useFetch from "../hooks/useFetch";
import { host_url, image_path } from "../utils/utils";
import { motion as m } from "framer-motion";
import gsap from "gsap";
import { Grid } from "@mui/material";
import { Link } from 'react-router-dom'
export default function Memories() {
    //const { data, error, isLoaded } = useFetch(host_url + "/image");

    const trackContainer = useRef(null);
    const container = useRef(null);

    const [isScrolling, setScrolling] = useState(false);

    const [item, setItem] = useState([]);

    const titlesContainer = useRef(null);
    const yearContainer = useRef(null);

    const min_left = 42.5;
    const max_right = 100 - min_left;

    useLayoutEffect(() => {
        initListeners();
        const images = document.querySelectorAll(`.image`);
        initBorders(images);
        const items = document.querySelectorAll(`.overflow-text`);
        initLineBorder(items);
    }, []);

    const initBorders = (items) => {
        for (let i = 0; i < items.length; i++) {
            gsap.to(items[i], {
                borderRadius: "2vmin",
                duration: 0,
            });
        }
        if (window.innerWidth < 800) {
            gsap.to(trackContainer.current, {
                transform: 'translate(-20%, -50%)'
            })
        }
        setItem(items);
    };

    const initLineBorder = (items) => {
        for (let i = 0; i < items.length; i++) {
            gsap.to(items[i], {
                borderTop: i < items.length - 1 ? window.innerWidth < 600 ? '1px solid black' : '0px solid black' : '0px solid black',
                borderBottom: window.innerWidth < 600 ? '1px solid black' : '0px solid black',
                duration: 0,
            });
        }
    }

    const initListeners = () => {
        container.current.onmousemove = (e) => handleMouseMove(e);
        container.current.onmousedown = (e) => handleMouseDown(e);
        container.current.onmouseup = () => handleOnUp();
        container.current.addEventListener("mousewheel", (e) => {
            handleMouseScroll(e);
        });
        window.addEventListener("resize", () => {
            const items = document.querySelectorAll(`.overflow-text`);
            initLineBorder(items);
            const images = document.querySelectorAll(`.image`);
            initBorders(images);
            updateAbsolutePosition(-50);
        });
        console.log("init");
    };

    const handleMouseScroll = (e) => {
        const nextPercentageUnconstrained =
            parseFloat(
                trackContainer.current.getAttribute("data-prev-percentage")
            ) +
            e.wheelDelta / 120;
        const nextPercentage = window.innerWidth < 1000 ? Math.max(
            Math.min(nextPercentageUnconstrained, -20),
            -80
        ) : Math.max(
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
        gsap.to(titlesContainer.current, {
            transform: `translatey(${0}rem)`,
            duration: 1.,
        });
        gsap.to(yearContainer.current, {
            transform: `translatey(${-3.5}rem)`,
            duration: 1.,
        });
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
        const percentage = (mouseDelta / maxDelta) * -min_left;
        const nextPercentageUnconstrained =
            parseFloat(
                trackContainer.current.getAttribute("data-prev-percentage")
            ) + percentage,
            nextPercentage = window.innerWidth < 1000 ? Math.max(
                Math.min(nextPercentageUnconstrained, -20),
                -80
            ) : Math.max(
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

            var min = window.innerWidth < 1000 ? 20 : min_left;

            for (const image of trackContainer.current.getElementsByClassName(
                "image"
            )) {
                gsap.to(image, {
                    objectPosition: `${100 + min + percentage}% center`,
                    duration: 2,
                    ease: "power2.out",
                    fill: "forwards",
                });
            }
        }
    };

    const animateIn = (index) => {
        gsap.to(item[index], {
            borderRadius: "15vmin",
            duration: 1.2,
            ease: "power2.out",
        });

        gsap.to(titlesContainer.current, {
            transform: `translatey(${-(index + 1) * 3.5}rem)`,
            duration: 1.,
        })

        gsap.to(yearContainer.current, {
            transform: `translatey(${-(index + 1) * 3.5}rem)`,
            duration: 1.,
        })
    };

    const animateOut = (index) => {
        gsap.to(item[index], {
            borderRadius: "2vmin",
            duration: 1.2,
            ease: "power2.out",
        });
    };

    const data = [
        { name: "DSC_0694.jpg", id: "3Y5469EzyslVhGUIITI6", "title": "Ftnss Trckr", "year": "2023" },
        { name: "DSC_0674.jpg", id: "9TIrW5pqtfC9cIKcG5fu", "title": "Expense Manager", "year": "2022" },
        { name: "DSC_0662.jpg", id: "PwGLWPa4pgnw1rPS0i1t", "title": "30 Days Poster", "year": "2022" },
        { name: "DSC_0674.jpg", id: "9TIrW5pqtfC9cIKcG5fu", "title": "Snkr E-commerce", "year": "2020" },
        { name: "DSC_0458.jpg", id: "SSRFGiddYEQKjXtvLcJG", "title": "Secret Society", "year": "2019" },
        { name: "DSC_0670.jpg", id: "SeteUHhdR8xQCoq7wCOX", "title": "White Collection", "year": "2018" },
        { name: "DSC_0642.jpg", id: "ANnNgHEr7XJh8persKCy", "title": "YRC Recruitment", "year": "2017" },
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
                    <Link to={'/project/' + image.title}>
                        <img
                            onMouseEnter={() => animateIn(index)}
                            onMouseLeave={() => animateOut(index)}
                            className="image"
                            id={`image-${index}`}
                            key={`image-${index}`}
                            src={`${image_path + "/" + image.name}`}
                            alt={image.id}
                            draggable="false"
                        />
                    </Link>
                ))}
            </div>
            <div className="bottom-div">
                <Grid container justify="space-between">
                    <Grid item xs={12} sm={3}>
                        <div className="grid-wrapper">
                            <div className="overflow-text" id="left">
                                <div className="dot"></div>
                                <div className="bottom-ui-container" ref={titlesContainer}>
                                    <div className="details-container-text" id={'title-text-container-default'}>
                                        <div className="details-text">
                                            Trung.
                                        </div>
                                    </div>
                                    {data.map((title, index) => (

                                        <div className="details-container-text" key={'title-' + index} id={'title-text-container-' + index}>
                                            <div className="details-text">
                                                {title.title}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                        <div className="grid-wrapper">
                            <div className="overflow-text" >
                                <div className="dot"></div>
                                <div className="bottom-ui-container" ref={yearContainer} style={
                                    { transform: `translatey(${-60}px)`, }
                                }>
                                    <div className="details-container-text" id={'title-text-container-default'}>
                                        <div className="details-text">
                                        </div>
                                    </div>
                                    {data.map((title, index) => (
                                        <div className="details-container-text" key={'title-' + index} id={'title-text-container-' + index}>
                                            <div className="details-text">
                                                {title.year}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                </Grid>
            </div>

        </m.div >
    );
}
