import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { textShuffle } from "../utils/utils";

export default function PreloaderAnimation() {
  const preloader = useRef(null);
  const preloader_2 = useRef(null);
  const preloader_3 = useRef(null);
  const preloader_4 = useRef(null);
  const loadingText = useRef(null);
  const titleText = useRef(null);
  const [isLoaded, updateLoaded] = useState(false);

  const [current, setCurrent] = useState(0);

  const delay = 2;

  const tl = gsap.timeline();

  useEffect(() => {
    setInterval(() => {
      if (!isLoaded) {
        let timer = null;
        textShuffle(loadingText.current, "Loading", timer, 150);
      }
    }, 1000);

    const onPageLoad = () => {
      console.log("page loaded");
      updateLoaded(true);
      // do something else
      tl.to(preloader.current, {
        delay: delay,
        top: "-100%",
        duration: 1,
        ease: "power2",
      })
        .to(preloader_2.current, {
          delay: -0.8,
          top: "-100%",
          duration: 1,
          ease: "power2",
        })
        .to(preloader_3.current, {
          delay: -0.8,
          top: "-100%",
          duration: 1,
          ease: "power2",
        })
        .to(preloader_4.current, {
          delay: -0.8,
          top: "-100%",
          duration: 1,
          ease: "power2",
        })
        .to(loadingText.current, {
          delay: -1.5,
          opacity: 0,
          duration: 1,
          ease: "power2",
        })
        .to(titleText.current, {
          delay: -1.5,
          opacity: 0,
          duration: 1,
          ease: "power2",
        });

      tl.play();
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      <div className="preloader" id="first-slide" ref={preloader}></div>
      <div className="preloader" id="second-slide" ref={preloader_2}></div>
      <div className="preloader" id="third-slide" ref={preloader_3}></div>
      <div className="preloader" id="fourth-slide" ref={preloader_4}></div>
      <div ref={titleText} className="text-title display">
        Folio. 01
      </div>
      <div ref={loadingText} className="text-loading">
        loading
      </div>
    </>
  );
}
