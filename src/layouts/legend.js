import React from "react";
import background from "../images/DSC_0642.jpg";
import { motion as m, } from 'framer-motion';
import { container, item } from "../animation/animation";

export default function LegendBanner() {
    return (
        <m.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
                duration: 0.75,
                ease: 'easeOut'
            }}>
            <div className="container custom-container">
                <m.div className="entrance-paragraph" variants={container} initial='hidden' animate='show'>
                    <div className="overflow-hidden">
                        <m.p variants={item} className="entrance-item">
                            Welcome to
                        </m.p>
                    </div>
                    <div className="overflow-hidden">
                        <m.p variants={item} className="entrance-item">
                            my hideout,
                        </m.p>
                    </div>
                    <div className="overflow-hidden">
                        <m.p variants={item} className="entrance-item">
                            my escape,
                        </m.p>
                    </div>
                    <div className="overflow-hidden">
                        <m.p variants={item} className="entrance-item">
                            unwavering
                        </m.p>
                    </div>
                    <div className="overflow-hidden">
                        <m.p variants={item} className="entrance-item">
                            <span className="display-text crimson">
                                cradle of purity.
                            </span>
                        </m.p>
                    </div>
                </m.div>
                <div
                    className="banner-image"
                    style={{
                        backgroundImage: `url(${background})`,
                    }}></div>
            </div>
        </m.div>
    );
}
