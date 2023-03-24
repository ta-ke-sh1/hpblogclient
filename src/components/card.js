import React from "react";

export default function Card({ props }) {
    return (
        <div>
            {props.title}
            {props.image[0]}
            {props.date}
            <div>
                <button>Read More</button>
            </div>
        </div>
    );
}
