import React from "react";
import { AuthProvider } from "./hooks/useAuth";

// Screens
import Navbar from "./layouts/navbar.js";
import AnimatedRoute from "./components/wrappers/animatedRoute";
import Cursor from "./components/cursor/cursor";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.scss";
import "./styles/fonts.scss";
import "./styles/entrance.scss";
import "./styles/navigation.scss";
import "./styles/body.scss";
import "./styles/card.scss";
import "./styles/color.scss";
import "./styles/margin.scss";
import "./styles/gallery.scss";
import "./styles/form.scss";
import "./styles/fab.scss";
import "./styles/modal.scss";
import "./styles/blog.scss";
import "./styles/cursor.scss"
import "./styles/aboutMe.scss"


const AppWrapper = () => {
    return (
        <>
            <AuthProvider>
                <Cursor />
                <Navbar />
                <AnimatedRoute />
            </AuthProvider>
        </>
    );
};

export default AppWrapper;
