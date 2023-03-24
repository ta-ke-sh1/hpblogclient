import React from "react";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./views/ErrorPage";
import Navbar from "./layouts/navbar";
import MainBlog from "./views/blog/main";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.scss";
import "./styles/fonts.scss";
import "./styles/entrance.scss";
import "./styles/navigation.scss";
import "./styles/body.scss";
import './styles/card.scss'
import BlogDetails from "./views/blog/details";


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
                            <Navbar />
                            <MainBlog />
                        </>
                    }
                />
                <Route
                    path="/blog/:id"
                    errorElement={<ErrorPage />}
                    element={
                        <>
                            <Navbar />
                            <BlogDetails />
                        </>
                    }
                />
                <Route element={<RequireAuth props={{ clearance: 1 }} />}>
                    <Route
                        path="/main/"
                        errorElement={<ErrorPage />}
                        element={
                            <>
                                <Navbar />
                            </>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
