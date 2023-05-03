import React from "react";
import Story from "../../layouts/story";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "../../views/ErrorPage";
import BlogDetails from "../../views/blog/details";
import BlogList from "../../layouts/bloglist";
import Memories from "../../layouts/memories";
import LoginPage from "../../views/login";
import { Routes, Route, useLocation } from "react-router-dom";

export default function AnimatedRoute() {
    const location = useLocation();
    return (
        <AnimatePresence initial={false} mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/writings" element={<BlogList />} />
                <Route path="/" element={<Memories />} />
                <Route path="/story" element={<Story />} />
                <Route
                    path="/project/:id"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <BlogDetails />
                        </>
                    }
                />
                <Route
                    path="/login"
                    errorElement={<ErrorPage />}
                    element={<LoginPage />}
                />
            </Routes>
        </AnimatePresence>
    );
}
