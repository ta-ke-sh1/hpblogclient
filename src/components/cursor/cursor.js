import $ from "jquery";
import React from "react";
import { gsap } from "gsap";

export default function Cursor() {
    return (
        <div>
            <span id="cursor-text" className="cursor-text reg">view</span>
            <span id="outer-circle" className="outer-circle"></span>
            <span id="circle" className="circle"></span>
        </div>
    );
}

$(function () {
    $(document).on("mousemove", (event) => {
        $(".circle").css({
            left: event.clientX - 2,
            top: event.clientY - 2,
        });
    });

    $(document).on("mousemove", (event) => {
        gsap.to($(".outer-circle"), {
            left: event.clientX - 20,
            top: event.clientY - 20,
            duration: 0.6,
            ease: "power",
        });
    });

    var h = document.getElementById("cursor-text").offsetHeight;
    var w = document.getElementById("cursor-text").offsetWidth;
    $(document).on("mousemove", (event) => {
        gsap.to($(".cursor-text"), {
            left: event.clientX - (w / 2),
            top: event.clientY - (h / 2),
            duration: 0.6,
            ease: "power",
        });
    });

    var cursor = $(".circle");
    var outer_cursor = $(".outer-circle");

    var outerAnim = gsap.timeline({ paused: true }).to(outer_cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power1",
    });
    var innerAnim = gsap.timeline({ paused: true }).to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0,
        ease: "none",
    });

    $(window)
        .on("mouseleave", () => {
            innerAnim.play();
            outerAnim.play();
        })
        .on("mouseenter", () => {
            innerAnim.reverse();
            outerAnim.reverse();
        });

    grantZoomObserver(".nav-item", cursor, "nav");
    grantZoomObserver(".image-track", cursor, "view");
});

const grantZoomObserver = (div, inner, text) => {

    var innerZoom = gsap.timeline({ paused: true });
    innerZoom.to(inner, {
        scale: 0.2,
        duration: 0.2,
        ease: "power2",
    });

    $(div)
        .on("mouseleave", () => {
            normal()
            gsap.to($(".cursor-text"), {
                opacity: 0,
                duration: 0.2,
                ease: "linear",
            });
        })
        .on("mouseenter", () => {
            magnify();
            gsap.to($(".cursor-text"), {
                opacity: 1,
                duration: 0.3,
                ease: "power",
            });
        })
        .on("mousedown", () => {
            shrink()
            gsap.to($(".cursor-text"), {
                opacity: 0,
                duration: 0.2,
                ease: "linear",
            });
        })
        .on("mouseup", () => {
            magnify();
            gsap.to($(".cursor-text"), {
                opacity: 1,
                duration: 0.3,
                ease: "power",
            });
        });
};

const normal = () => {
    gsap.to($(".outer-circle"), {
        scale: 1,
        duration: 0.3,
        ease: "power",
    });

}

const shrink = () => {
    gsap.to($(".outer-circle"), {
        scale: 0.4,
        duration: 0.3,
        ease: "power",
    });
}

const magnify = () => {
    gsap.to($(".outer-circle"), {
        scale: 4,
        duration: 0.3,
        ease: "power",
    });
}