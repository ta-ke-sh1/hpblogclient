/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from "react";
import { host_url, image_path } from "../utils/utils";
import { motion as m } from "framer-motion";
import gsap from "gsap";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Memories() {
    //const { data, error, isLoaded } = useFetch(host_url + "/image");
    const navigate = useNavigate();
    const trackContainer = useRef(null);
    const container = useRef(null);
    const arrow = useRef(null);

    const [isMouseDown, setMouseDown] = useState(false);

    const [isScrolling, setScrolling] = useState(false);

    const [item, setItem] = useState([]);

    const titlesContainer = useRef(null);
    const yearContainer = useRef(null);

    const min_left = 32.5;
    const max_right = 100 - min_left;

    const line_height = 2.5;

    useLayoutEffect(() => {
        initListeners();
        const images = document.querySelectorAll(`.image`);
        initBorders(images);
        const items = document.querySelectorAll(`.overflow-text`);
        initLineBorder(items);
    }, []);

    const initBorders = (items) => {
        if (window.innerWidth < 800) {
            gsap.to(trackContainer.current, {
                transform: `translate(${-min_left / 2}%, -50%)`,
            });
        } else {
            gsap.to(trackContainer.current, {
                transform: `translate(-${min_left}%, -50%)`,
            });
        }
        setItem(items);
    };

    const initLineBorder = (items) => {
        for (let i = 0; i < items.length; i++) {
            gsap.to(items[i], {
                borderTop:
                    window.innerWidth < 600
                        ? "1px solid black"
                        : "0px solid black",
                duration: 0,
            });
        }
    };

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
        const nextPercentage =
            window.innerWidth < 1000
                ? Math.max(Math.min(nextPercentageUnconstrained, -20), -80)
                : Math.max(
                      Math.min(nextPercentageUnconstrained, -min_left),
                      -max_right
                  );
        updateAbsolutePosition(nextPercentage);
        if (trackContainer.current) {
            trackContainer.current.setAttribute(
                "data-prev-percentage",
                parseFloat(
                    trackContainer.current.getAttribute("data-percentage")
                )
            );
        }
    };

    const containerMouseLeave = () => {
        gsap.to(titlesContainer.current, {
            transform: `translatey(${0}rem)`,
            duration: 1,
        });
        gsap.to(yearContainer.current, {
            transform: `translatey(${-line_height}rem)`,
            duration: 1,
        });
    };

    const handleOnUp = () => {
        setMouseDown(false);
        if (trackContainer.current) {
            trackContainer.current.setAttribute("data-mouse-down-at", "0");
            trackContainer.current.setAttribute(
                "data-prev-percentage",
                parseFloat(
                    trackContainer.current.getAttribute("data-percentage")
                )
            );
        }
    };

    const handleMouseDown = (e) => {
        setMouseDown(true);
        if (trackContainer.current) {
            trackContainer.current.setAttribute(
                "data-mouse-down-at",
                e.clientX
            );
        }
    };

    const handleMouseMove = (e) => {
        if (trackContainer.current) {
            if (
                trackContainer.current.getAttribute("data-mouse-down-at") ===
                "0"
            )
                return;
            const mouseDelta =
                    parseFloat(
                        trackContainer.current.getAttribute(
                            "data-mouse-down-at"
                        )
                    ) - e.clientX,
                maxDelta = window.innerWidth / 2;
            const percentage = (mouseDelta / maxDelta) * -min_left;
            const nextPercentageUnconstrained =
                    parseFloat(
                        trackContainer.current.getAttribute(
                            "data-prev-percentage"
                        )
                    ) + percentage,
                nextPercentage =
                    window.innerWidth < 1000
                        ? Math.max(
                              Math.min(nextPercentageUnconstrained, -20),
                              -80
                          )
                        : Math.max(
                              Math.min(nextPercentageUnconstrained, -min_left),
                              -max_right
                          );
            updateAbsolutePosition(nextPercentage);
        }
    };

    const updateAbsolutePosition = (percentage) => {
        if (trackContainer.current) {
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
            }
        }
    };

    const animateIn = (index) => {
        if (isMouseDown) return;
        var image = document.getElementById(`image-div-${index}`);

        gsap.to(image, {
            duration: 2,
        });

        gsap.to(titlesContainer.current, {
            transform: `translatey(${-(index + 1) * line_height}rem)`,
            duration: 1,
        });

        gsap.to(yearContainer.current, {
            transform: `translatey(${-(index + 1) * line_height}rem)`,
            duration: 1,
        });
    };

    const animateOut = (index) => {
        if (isMouseDown) return;

        var image = document.getElementById(`image-div-${index}`);
        gsap.to(image, {
            duration: 2,
        });
    };

    const handleNavigate = (index) => {
        navigate("/project/" + index);
    };

    const data = [
        {
            name: "DSC_0694.jpg",
            id: "3Y5469EzyslVhGUIITI6",
            title: "Ftnss Trckr",
            year: "2023",
        },
        {
            name: "DSC_0674.jpg",
            id: "9TIrW5pqtfC9cIKcG5fu",
            title: "Expense Manager",
            year: "2022",
        },
        {
            name: "DSC_0662.jpg",
            id: "PwGLWPa4pgnw1rPS0i1t",
            title: "30 Days Poster",
            year: "2022",
        },
        {
            name: "DSC_0674.jpg",
            id: "9TIrW5pqtfC9cIKcG5fu",
            title: "Snkr E-commerce",
            year: "2020",
        },
        {
            name: "DSC_0458.jpg",
            id: "SSRFGiddYEQKjXtvLcJG",
            title: "Secret Society",
            year: "2019",
        },
        {
            name: "DSC_0670.jpg",
            id: "SeteUHhdR8xQCoq7wCOX",
            title: "White Collection",
            year: "2018",
        },
        {
            name: "DSC_0642.jpg",
            id: "ANnNgHEr7XJh8persKCy",
            title: "YRC Recruitment",
            year: "2017",
        },
    ];

    return (
        <m.div
            style={{ overflow: "hidden", height: "100vh" }}
            ref={container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.75,
                ease: "easeOut",
            }}>
            <div
                className="image-track"
                ref={trackContainer}
                id="memory-track"
                data-mouse-down-at="0"
                data-prev-percentage="0"
                data-percentage="0"
                onMouseUp={() => handleOnUp()}
                onMouseLeave={() => containerMouseLeave()}>
                {data.map((image, index) => (
                    <>
                        <div
                            onMouseEnter={() => animateIn(index)}
                            onMouseLeave={() => animateOut(index)}
                            onClick={() => handleNavigate(index)}
                            className="img-container"
                            id={`image-${index}`}
                            key={`image-${index}`}>
                            <img
                                preserveAspectRatio="xMidYMid slice"
                                id={`image-div-${index}`}
                                className="image"
                                width={"100%"}
                                height={"100%"}
                                src={`${image_path + "/" + image.name}`}
                                alt={image.id}
                                draggable="false"
                            />
                        </div>
                    </>
                ))}
            </div>
            <div className="bottom-div">
                <Grid container justify="space-between" columns={12}>
                    <Grid item xs={12} sm={2}>
                        <div className="grid-wrapper">
                            <div className="overflow-text" id="left">
                                <div className="bottom-ui-container">
                                    <div className="details-container-text">
                                        <div className="details-text med">
                                            Project
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className="grid-wrapper">
                            <div className="overflow-text">
                                <div
                                    className="bottom-ui-container"
                                    ref={titlesContainer}>
                                    <div className="details-container-text">
                                        <div className="details-text">
                                            Portfolio - Vol.1
                                        </div>
                                    </div>
                                    {data.map((title, index) => (
                                        <div
                                            className="details-container-text"
                                            key={"title-" + index}
                                            id={
                                                "title-text-container-" + index
                                            }>
                                            <div className="details-text">
                                                {title.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        display={"flex"}
                        justifyContent="flex-end">
                        <div className="grid-wrapper">
                            <div className="overflow-text" id="left">
                                <div className="bottom-ui-container">
                                    <div className="details-container-text">
                                        <div className="details-text med">
                                            Year
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2} display={"flex"}>
                        <div className="grid-wrapper">
                            <div className="overflow-text">
                                <div
                                    className="bottom-ui-container"
                                    ref={yearContainer}>
                                    <div
                                        className="details-container-text"
                                        id={"title-text-container-default"}>
                                        <div className="details-text">2023</div>
                                    </div>
                                    {data.map((title, index) => (
                                        <div
                                            className="details-container-text"
                                            key={"title-" + index}
                                            id={
                                                "title-text-container-" + index
                                            }>
                                            <div className="details-text">
                                                {title.year}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        display="flex"
                        justifyContent="space-between"
                        item
                        xs={12}
                        sm={4}>
                        <div
                            style={{ zIndex: 10 }}
                            display={"inline-flex"}
                            className="ideas-row-text med">
                            Scroll / Drag
                        </div>
                        <div className="arrow-row" id="arrow" ref={arrow}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 421.37 130.81">
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <path d="M0,68.91H408l-57,57,4.95,5,65.41-65.4L356,0,351,5l57,57H0m0,0v7" />
                                        <polygon points="351.01 4.95 351.01 4.95 351.01 4.95 351.01 4.95" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div
                            style={{ zIndex: 10 }}
                            display={"inline-flex"}
                            className="ideas-row-text med">
                            Explore
                        </div>
                    </Grid>
                </Grid>
            </div>
        </m.div>
    );
}
