import React from "react"
import axios from "axios"

export default function WriteMe() {

    function handleSubmit() {

    }

    return (
        <>
            <div>
                <h1>Write me some thing</h1>
                <input type="text" />
                <button onSubmit={() => { handleSubmit() }}>Send</button>
            </div>
        </>
    )
}