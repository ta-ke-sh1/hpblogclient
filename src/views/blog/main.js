import React from "react";
import LegendBanner from "../../layouts/legend";
import BlogList from "../../layouts/bloglist";
import Footer from "../../layouts/footer";
import WriteMe from "../../layouts/writeMe";

export default function MainBlog() {
    return (
        <>
            <LegendBanner />
            <BlogList />
            <WriteMe />
            <Footer />
        </>
    );
}
