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
import "./styles/cursor.scss";
import "./styles/aboutMe.scss";

const AppWrapper = () => {
  return (
    <>
      <AuthProvider>
        <Cursor />
        <Navbar />
        <AnimatedRoute />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10000000,
            pointerEvents: "none",
            opacity: 0.2,
            mixBlendMode: "difference",
          }}
        >
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </AuthProvider>
    </>
  );
};

export default AppWrapper;
