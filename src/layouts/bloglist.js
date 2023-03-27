import React from "react";

// eslint-disable-next-line
import useFetch from '../hooks/useFetch'

// eslint-disable-next-line
import { host_url } from "../utils/utils";

import BlogCard from "../components/card/blogCard";
import { Link } from "react-router-dom";
import FloatingActionButton from "../components/floatingActionButton";
import useModal from "../hooks/useModal";
import Modal from "../components/modals/modal";
import BlogForm from "../components/form/blogForm";

export default function BlogList() {
    const { isShowing, toggle } = useModal();
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

    const showForm = () => {
        console.log('Clicked');
        toggle();
    }

    return (
        <>
            <div className="custom-container mt-70">
                <div className="custom-wrapper h-30 t-center">
                    <div className="center-div w-40">
                        <div className="custom-row">
                            <h1 className="display-font s-48 primary-color ml-5">my writings </h1>
                            <span className="display-font s-24 primary-color ml-5">({data.length})</span>
                        </div>
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque massa risus, vitae dictum sem condimentum eu. Maecenas eu arcu ut elit feugiat lobortis at id libero. Vestibulum tempus eros ac diam ullamcorper elementum. Vestibulum ut euismod tortor. Donec dui velit, tempus ac magna at, aliquam laoreet sapien.
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
                <FloatingActionButton props={{ size: '100px', bg_color: '#f53c62', onClick: showForm, isShowing: isShowing }} />
                <Modal isShowing={isShowing} hide={toggle}>
                    <BlogForm />
                </Modal>
            </div>
        </>
    )
}