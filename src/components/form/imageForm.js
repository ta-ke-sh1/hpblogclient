import React, { useState, useRef } from "react"
const c_tags = ['title', 'daily'];

export default function ImageForm() {
    const inputRef = useRef(null)
    const [image, setImage] = useState(null);

    const handleClick = () => {
        // 👇️ open file input box on click of another element
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setImage(event.target.files[0])
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            image: image,
        })
    }

    return (
        <div className="form">
            <h1>Image Form</h1>
            <input accept="image/*" style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange} />
            <div onClick={handleClick} className="my-btn s-24 secondary-color-bg hover-shadow"> {image ? <div>Current Image: {image.name}</div> : <div>Add Image</div>} </div>
            <form action="" encType="multipart/form-data">
                <button onClick={handleSubmit} className="my-btn primary-color-bg s-24 hover-shadow">Post</button>
            </form>
        </div >
    )
}
