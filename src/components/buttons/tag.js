import React from "react"

export default function Tag({ text }) {
    return (
        <div className="tag primary-color">
            {text.split(' ').join('-')}
        </div>
    );
}