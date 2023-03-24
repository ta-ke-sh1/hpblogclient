import React, { useRef } from "react";
import { convertDateToDisplayFormat, fromMilisecondsToFormattedDate, host_url } from "../../utils/utils";
import gsap from "gsap";
import Tag from "../tag";

export default function BlogCard({ props }) {
    const coverContainer = useRef();
    const imageContainer = useRef();
    const container = useRef();

    var height = (window.innerHeight * 25) / 100;

    const handleEnter = () => {
        gsap.to(coverContainer.current, {
            y: -height,
            ease: "power",
            duration: 0.6,
        });
        gsap.to(imageContainer.current, {
            scale: 1.1,
            ease: "power",
            duration: 0.9,
        });
    };

    const handleLeave = () => {
        gsap.to(coverContainer.current, {
            y: 0,
            ease: "power",
            duration: 0.6,
        });
        gsap.to(imageContainer.current, {
            scale: 1,
            ease: "power",
            duration: 0.9,
        });
    };

    return (
        <>
            <div
                className="card-container"
                ref={container}
                onMouseEnter={() => handleEnter()}
                onMouseLeave={() => handleLeave()}>
                <div className="card-content">
                    <h1>{props.title}</h1>
                    <p>{props.location} <br />
                        {convertDateToDisplayFormat(props.date * 1000)}
                    </p>
                    <div style={{
                        display: 'flex'
                    }}>
                        {props.tags.map((tag) => <Tag text={tag} />)}
                    </div>
                </div>
                <div
                    className="card-background"
                    ref={imageContainer}
                    style={{
                        backgroundImage: `url(${host_url +
                            "/" +
                            fromMilisecondsToFormattedDate(props.date) +
                            "-" +
                            props.id +
                            "/" +
                            props.image[0]
                            })`,
                    }}></div>
            </div>
        </>
    );
}
