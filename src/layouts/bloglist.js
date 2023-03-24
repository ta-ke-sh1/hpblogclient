import React from "react";

// eslint-disable-next-line
import useFetch from '../hooks/useFetch'

// eslint-disable-next-line
import { host_url } from "../utils/utils";

import BlogCard from "../components/card/blogCard";
import { Link } from "react-router-dom";

export default function BlogList() {

    // const { data, isLoading, error } = useFetch(host_url + '/blog')

    const data = [
        { id: "B0TLpP15YCeGxsEeshh2", image: ["image1.jpg"], date: 1679204728, content: "Lorem ipsum", view_count: 0, tags: ["Travel"], title: "How To Write A Blog", location: "Ha Noi" },
        { id: "C6SWVqebuMYzXTSguNTn", date: 1679204728, image: ["image4.jpg", "image2.jpg"], title: "What is Life?", content: "Lorem ipsum sit dolor", view_count: "12", tags: ["Thoughts", "Existential"], location: "Ha Noi" },
        { id: "bDmrRfHg2N0VfxTvZBp5", date: 1679240728, image: ["image3.jpg"], title: "Loren Ipsum Sit Dolor", content: "Lorem ipsum sit dolor", view_count: 12, tags: ["Daily", "Thoughts", "Life"], location: "Ha Noi" }
    ]

    // if (isLoading) {
    //     return <h1>Loading ... </h1>
    // }

    // if (error) {
    //     return <h1>{error.data}</h1>
    // }

    return (
        <>
            <div className="custom-container">
                <div className="col">
                    <div className="row">
                        <h1>My Latest Writings</h1>
                    </div>
                </div>
                {
                    data.map((blog, index) => (
                        <Link key={'blog'+index} to={'/blog/' + blog.id} >
                            <BlogCard props={{
                                index: index,
                                id: blog.id,
                                date: blog.date,
                                image: blog.image,
                                view_count: blog.view_count,
                                tags: blog.tags,
                                title: blog.title,
                                location: blog.location,
                            }} />
                        </Link>
                    ))
                }
                <div className="col">
                    <div className="row">
                        <h1>Read All</h1>
                    </div>
                </div>
            </div>
        </>
    )
}