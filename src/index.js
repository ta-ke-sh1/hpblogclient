import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PreloaderAnimation from "./animation/preloader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PreloaderAnimation />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
