import React from "react";

export default function LayoutWrapper({ children }) {
    return (
        <>
            <div className="custom-wrapper">
                <div className="center-container ">
                    <div className="custom-body">{children}</div>
                </div>
            </div>
        </>
    );
}
