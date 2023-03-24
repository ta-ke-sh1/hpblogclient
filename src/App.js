import React from "react";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./views/ErrorPage";

import MainBlog from "./views/blog/main";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.scss";
import "./styles/fonts.scss";
import "./styles/entrance.scss";
import "./styles/navigation.scss";
import "./styles/body.scss";
import "./styles/card.scss";
import BlogDetails from "./views/blog/details";
import BlogList from "./layouts/bloglist";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route
                    path="/"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <MainBlog />
                        </>
                    }
                />
                <Route path="/blog" element={<BlogList />} />
                <Route
                    path="/blog/:id"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <BlogDetails />
                        </>
                    }
                />
                <Route element={<RequireAuth props={{ clearance: 1 }} />}>
                    <Route
                        path="/main/"
                        errorElement={<ErrorPage />}
                        element={<></>}
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
