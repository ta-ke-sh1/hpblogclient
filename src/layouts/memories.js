import React, { useState, useEffect } from "react"
import LightGallery from 'lightgallery/react';

export default function Memories() {
    const [items, getItems] = useState([]);

    useEffect(() => {

    }, [items]);

    const getImages = () => {
        return items.map((item) => {
            return (
                <div
                    key={item.id}
                    data-lg-size={item.size}
                    className="gallery-item"
                    data-src={item.src}
                >
                    <img
                        style={{ maxWidth: '280px' }}
                        className="img-responsive"
                        alt={item.src}
                        src={item.thumb}
                    />
                </div>
            );
        })
    }

    return (
        <div className="custom-container mt-70">
            <div className="custom-wrapper h-30 t-center">
                <div className="center-div w-40">
                    <div className="custom-row">
                        <h1 className="display-font s-48 primary-color ml-5">my memories </h1>
                        <span className="display-font s-24 primary-color ml-5">({items.length})</span>
                    </div>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque massa risus, vitae dictum sem condimentum eu. Maecenas eu arcu ut elit feugiat lobortis at id libero. Vestibulum tempus eros ac diam ullamcorper elementum. Vestibulum ut euismod tortor. Donec dui velit, tempus ac magna at, aliquam laoreet sapien.
                    </p>
                </div>
            </div>
            <LightGallery elementClassNames="custom-gallery-wrapper">
                {getImages()}
            </LightGallery>
        </div>
    )
}