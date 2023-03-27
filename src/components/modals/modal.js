import React from "react";

export default function Modal({ isShowing, hide, children }) {
    return isShowing ? (<>
        <div className="modal-overlay" >
            {children}
        </div>
    </>) : null;
}