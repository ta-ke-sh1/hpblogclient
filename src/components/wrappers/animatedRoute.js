import React from "react";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "../../views/ErrorPage";
import BlogDetails from "../../views/blog/details";
import BlogList from "../../layouts/bloglist";
import Memories from "../../layouts/memories";
import LoginPage from "../../views/login";
import { Routes, Route, useLocation } from "react-router-dom";
import AboutMe from "../../layouts/aboutMe";
import StoryCard from "../card/storyCard";
import Story from "../../views/about/story";
import { useDimensions } from "../../hooks/useDimensions";
import VerticalMarqueTrack from "../marques/vertical";

export default function AnimatedRoute() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode={"wait"}>
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/writings" element={<BlogList />} />
        <Route path="/" element={<Memories />} />
        <Route path="/about" element={<AboutMe />} />
        <Route
          path="/testCard"
          element={
            <>
              <VerticalMarqueTrack />
            </>
          }
        ></Route>
        <Route path="/project/:id" errorElement={<ErrorPage />} element={<BlogDetails />} />
        <Route path="/login" errorElement={<ErrorPage />} element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}
