import React, { useRef } from "react"
import { fromMilisecondsToFormattedDate, host_url } from "../../utils/utils";
import gsap from 'gsap';
import $ from 'jquery';

export default function BlogCard({ props }) {
    const coverContainer = useRef();
    const imageContainer = useRef();
    const container = useRef();

    var height = window.innerHeight * 25 / 100;

    $(function () {
        $(container.current).hover(function (e) {
            gsap.to(coverContainer.current, {
                y: -height,
                ease: 'power',
                duration: 0.6
            });
            gsap.to(imageContainer.current, {
                scale: 1.1,
                ease: 'power',
                duration: 0.9
            })
        }, function (e) {
            gsap.to(coverContainer.current, {
                y: 0,
                ease: 'power',
                duration: 0.6
            })
            gsap.to(imageContainer.current, {
                scale: 1,
                ease: 'power',
                duration: 0.9
            })
        });
    });

    return (
        <>
            <div className="card-container" ref={container}>
                <div className="card-content">
                    <div className="row">
                        <div className="col-sm-2">
                            <h1>({props.index + 1})</h1>
                        </div>
                        <div className="col-sm-6 title">
                            <h1>{props.title}</h1>
                        </div>
                        <div className="col-sm-3">
                            <h1>{props.location}</h1>
                            <h1>{fromMilisecondsToFormattedDate(props.date)}</h1>
                        </div>
                    </div>
                </div>
                <div className="card-background" ref={coverContainer} style={
                    {
                        backgroundColor: '#f8f8f8',
                        zIndex: 1,
                    }
                }></div>
                <div className="card-background" ref={imageContainer} style={
                    {
                        backgroundImage: `url(${host_url + "/" + fromMilisecondsToFormattedDate(props.date) + "-" + props.id + "/" + props.image[0]})`
                    }
                }></div>
            </div>
        </>
    )
}