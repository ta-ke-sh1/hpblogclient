import React, { useState, useRef } from "react"
import { TextField, Autocomplete } from "@mui/material";


const c_tags = ['title', 'daily'];

export default function BlogForm() {
    const inputRef = useRef(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);

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
            title: title,
            content: content,
            image: image,
            tags: tags,
        })
    }

    return (
        <div className="form">
            <h1>Blog Form</h1>
            <TextField variant="standard" fullWidth label="Your Username" className="input-field" type="text" value={title} onChange={(e) =>
                setTitle(
                    e.target.value
                )} />
            <TextField variant="standard" fullWidth label="Content" multiline minRows={4} maxRows={22} className="input-field" type="text" value={content} onChange={(e) =>
                setContent(
                    e.target.value
                )} />
            <br />
            <Autocomplete
                fullWidth
                multiple
                id="tags-standard"
                options={c_tags}
                freeSolo
                getOptionLabel={(option) => option}
                defaultValue={[c_tags[0]]}
                onChange={(event, newInputValue) => {
                    setTags(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Tags"
                    />
                )}
            />
            <br />
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
