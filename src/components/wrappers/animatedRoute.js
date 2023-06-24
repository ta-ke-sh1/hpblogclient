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
            <StoryCard
              className={"draggable"}
              key={"111"}
              id={"111"}
              pos={{ x: 500, y: 200 }}
              children={
                <>
                  <Story />
                </>
              }
              title={"Testing"}
              width={35}
              height={100}
            />
          }
        ></Route>
        <Route path="/project/:id" errorElement={<ErrorPage />} element={<BlogDetails />} />
        <Route path="/login" errorElement={<ErrorPage />} element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}
