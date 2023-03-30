import React from "react";
// eslint-disable-next-line
import useFetch from '../hooks/useFetch'
// eslint-disable-next-line
import { host_url } from "../utils/utils";
import BlogCard from "../components/card/blogCard";
import { Link } from "react-router-dom";
import { motion as m } from 'framer-motion'

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
        <m.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
                duration: 0.75,
                ease: 'easeOut'
            }}>
            <div className="custom-container mt-70">
                <br /><br />
                <div className="custom-wrapper h-20 t-center">
                    <div className="custom-row">
                        <h1 className="display-font s-48 primary-color ml-5">my writings </h1>
                        <span className="display-font s-24 primary-color ml-5">({data.length})</span>
                    </div>
                    <div className="center-div w-40 mt-4">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque massa risus, vitae dictum sem condimentum eu. Maecenas eu arcu ut elit feugiat lobortis at id libero. Vestibulum tempus eros ac diam ullamcorper elementum. Vestibulum ut euismod tortor.
                        </p>
                    </div>
                </div>
                {
                    data.map((blog, index) => (
                        <Link key={'blog' + index} to={'/blog/' + blog.id} >
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
            </div>
        </m.div>
    )
}