import React, { useLayoutEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Grid } from "@mui/material";
import { convertDateToDisplayFormat } from "../../utils/utils";
import { gsap } from "gsap";

const data = {
    id: "B0TLpP15YCeGxsEeshh2",
    date: 1679204728,
    content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ex, feugiat in est ut, sagittis vulputate dui. Vivamus vehicula pharetra consectetur. Aliquam sodales nibh et enim tempor, vitae fringilla purus ornare. Maecenas hendrerit interdum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus libero quam, facilisis nec elit at, rhoncus vulputate ipsum. Nullam viverra elit turpis, id tristique nunc lobortis a. Sed dui nulla, molestie quis nulla nec, convallis lacinia ipsum.",
    view_count: 0,
    tags: ["Travel"],
    title: "30 Days",
    location: "Ha Noi",
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
];

const titles = [
    "day 1",
    "day 2",
    "day 3",
    "day 4",
    "day 5",
    "day 6",
    "day 7",
    "day 8",
    "day 9",
    "day 10",
    "day 11",
    "day 12",
    "day 13",
    "day 14",
    "day 15",
    "day 16",
    "day 17",
    "day 18",
    "day 19",
    "day 20",
    "day 21",
    "day 22",
    "day 23",
    "day 24",
    "day 25",
    "day 26",
    "day 27",
    "day 28",
    "day 29",
    "day 30",
];

export default function BlogDetails({ props }) {
    const posterTrackContainer = useRef(null);
    const blogTitle = useRef(null);

    useLayoutEffect(() => {});

    let interval = null;

    const onTrackLeave = () => {
        textShuffle(blogTitle.current, "30 days", interval);
    };

    const imageOnMouseOver = (index) => {
        textShuffle(blogTitle.current, titles[index], interval);
    };

    const textShuffle = (sourceElement, content, interval) => {
        let iteration = 0;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        clearInterval(interval);

        interval = setInterval(() => {
            sourceElement.innerText = content
                .split("")
                .map((letter, i) => {
                    if (i < iteration) {
                        return content[i].toLowerCase();
                    }

                    return letters[
                        Math.floor(Math.random() * 26)
                    ].toLowerCase();
                })
                .join("");

            if (iteration >= content.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2;
        }, 30);
    };

    return (
        <m.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            className="custom-wrapper"
            transition={{
                duration: 0.75,
                ease: "easeOut",
            }}>
            <div className="blog-details-wrapper">
                <div className="blog-text med">
                    <p id="blog-title" ref={blogTitle}>
                        30 days
                    </p>
                </div>
                <div className="blog-details-content">
                    <div
                        id="30-days-track"
                        className="track"
                        ref={posterTrackContainer}
                        onMouseLeave={() => onTrackLeave()}>
                        {numbers.map((i, index) => {
                            return (
                                <div
                                    onMouseOver={() => imageOnMouseOver(index)}
                                    className="poster-image"
                                    key={"poster-" + index}>
                                    <div
                                        alt="flower"
                                        className="blog-img"
                                        style={{
                                            backgroundImage:
                                                `url("${process.env.PUBLIC_URL}` +
                                                "/projects/30_days/day " +
                                                i +
                                                `.jpg")`,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="navigation-guide med">
                    <p>Scroll to Explore</p>
                </div>
            </div>
        </m.div>
    );
}
