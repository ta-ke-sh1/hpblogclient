import React from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
    const data = { id: "B0TLpP15YCeGxsEeshh2", image: ["image1.jpg"], date: 1679204728, content: "Lorem ipsum", view_count: 0, tags: ["Travel"], title: "How To Write A Blog", location: "Ha Noi" }
    let { id } = useParams();
    console.log(id);

    return (<>
        <h1>Details</h1>
    </>)
}