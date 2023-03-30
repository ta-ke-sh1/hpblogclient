import React from "react";
import { AuthProvider } from "./hooks/useAuth";

// Screens
import Navbar from './layouts/navbar.js'

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
import './styles/locomotive.css'
import AnimatedRoute from "./components/wrappers/animatedRoute";

const AppWrapper = () => {
    return (
        <>
            <Navbar />
            <AuthProvider>
                <AnimatedRoute />
            </AuthProvider>
        </>

    )
}

export default AppWrapper;
