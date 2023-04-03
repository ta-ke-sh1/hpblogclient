import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import React, { useRef } from 'react';

export default function ScrollWrapper({ children }) {
    const containerRef = useRef(null);

    return (
        <LocomotiveScrollProvider
            options={
                {
                    smooth: true,
                    lerp: 0.03, // Linear Interpolation, 0 > 1 // Try 0.01
                    multiplier: 1.4, // Effect Multiplier
                    reloadOnContextChange: true,
                    touchMultiplier: 2,
                    smoothMobile: 0,
                    smartphone: {
                        smooth: !0,
                        breakpoint: 767
                    },
                    tablet: {
                        smooth: !1,
                        breakpoint: 1024
                    },
                }
            }
            watch={[]}
            onLocationChange={scroll => scroll.scrollTo(0, { duration: 0, disableLerp: true })}
            containerRef={containerRef}>

            <main data-scroll-container ref={containerRef}>
                <div data-scroll-section>
                    {children}
                </div>
            </main>
        </LocomotiveScrollProvider>
    );
}