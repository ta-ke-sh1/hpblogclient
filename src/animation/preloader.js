import gsap from "gsap";
import {
    useEffect,
    useRef,
    useState,
    useContext,
    createContext,
    useMemo,
} from "react";
import { textShuffle } from "../utils/utils";

const Preloader = createContext();

export function usePreloader() {
    return useContext(Preloader);
}

export function PreloaderWrapper({ children }) {
    const preloader = useRef(null);
    const preloader_2 = useRef(null);
    const preloader_3 = useRef(null);
    const preloader_4 = useRef(null);
    const titleText = useRef(null);
    const [isLoaded, updateLoaded] = useState(false);

    const delay = 2;

    const tl = gsap
        .timeline()
        .to(preloader.current, {
            delay: delay,
            top: "-105%",
            duration: 1,
            ease: "power2",
        })
        .to(preloader_2.current, {
            delay: -0.8,
            top: "-105%",
            duration: 1,
            ease: "power2",
        })
        .to(preloader_3.current, {
            delay: -0.8,
            top: "-105%",
            duration: 1,
            ease: "power2",
        })
        .to(preloader_4.current, {
            delay: -0.8,
            top: "-105%",
            duration: 1,
            ease: "power2",
        })
        .to(titleText.current, {
            delay: -1.5,
            opacity: 0,
            duration: 1,
            ease: "power2",
        });

    useEffect(() => {
        const onPageLoad = () => {
            console.log("page loaded");
            updateLoaded(true);
            // do something else
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

    let value = useMemo(() => ({ tl, isLoaded }), [tl, isLoaded]);

    return (
        <Preloader.Provider value={value}>
            <>
                <div
                    className="preloader"
                    id="first-slide"
                    ref={preloader}></div>
                <div
                    className="preloader"
                    id="second-slide"
                    ref={preloader_2}></div>
                <div
                    className="preloader"
                    id="third-slide"
                    ref={preloader_3}></div>
                <div
                    className="preloader"
                    id="fourth-slide"
                    ref={preloader_4}></div>
                <div ref={titleText} className="text-title display">
                    Folio. 01
                </div>
            </>
            {children}
        </Preloader.Provider>
    );
}
