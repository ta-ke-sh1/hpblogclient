import React from "react"

export default function LegendBanner() {
    return (
        <div className="container custom-container">
            <div className="row custom-center">
                <div className="col entrance-col">
                    <div className="entrance-paragraph">
                        <p>
                            Welcome to my <br /> little hideout, <br />
                            my escape, unwavering <br />
                            <span className="display-text">
                                cradle of <br />
                                <span className="crimson">purity</span>.
                            </span>
                        </p>
                    </div>
                </div>
                <div className="col entrance-col">
                    <div className="entrance-shape"></div>
                </div>
            </div>
        </div>
    )
}