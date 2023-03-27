import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";

// Screens
import ErrorPage from "./views/ErrorPage";
import BlogDetails from "./views/blog/details";
import BlogList from "./layouts/bloglist";
import LegendBanner from "./layouts/legend";
import Memories from "./layouts/memories";
import LoginPage from "./views/login";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.scss";
import "./styles/fonts.scss";
import "./styles/entrance.scss";
import "./styles/navigation.scss";
import "./styles/body.scss";
import "./styles/card.scss";
import './styles/color.scss';
import './styles/margin.scss';
import './styles/gallery.scss';
import './styles/form.scss';
import './styles/fab.scss';
import './styles/modal.scss'
import Story from "./layouts/story";

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
                            <LegendBanner />
                        </>
                    }
                />
                <Route path="/writings" element={<BlogList />} />
                <Route path='/memories' element={<Memories />} />
                <Route path='/story' element={<Story />} />
                <Route
                    path="/blog/:id"
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
        </AuthProvider>
    );
};

export default App;
