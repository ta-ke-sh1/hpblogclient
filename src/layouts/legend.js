import React from "react";
import background from "../images/DSC_0642.jpg";

export default function LegendBanner() {
    return (
        <div className="container custom-container">
            <div className="entrance-paragraph">
                <p>
                    Welcome to <br />
                    my hideout, <br />
                    my escape, <br /> unwavering <br />
                    <span className="display-text crimson">
                        cradle of purity.
                    </span>
                </p>
            </div>
            <div
                className="banner-image"
                style={{
                    backgroundImage: `url(${background})`,
                }}></div>
        </div>
    );
}
