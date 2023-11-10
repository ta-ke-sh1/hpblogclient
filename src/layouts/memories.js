/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { cursorMagnify, cursorNormal, randomInteger, textShuffle } from "../utils/utils";
import { motion as m, transform } from "framer-motion";
import gsap from "gsap";
import { Divider, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePreloader } from "../animation/preloader";
import GradientMap from "../components/gradient/gradient";
import { useDimensions } from "../hooks/useDimensions";
import MobileMain from "./mobile/mainMobile";
import MarqueTrack from "../components/marques/Marque";
import VerticalMarqueTrack from "../components/marques/vertical";

const data = [
  {
    name: "1",
    id: "3Y5469EzyslVhGUIITI6",
    title: "Ftnss Trckr",
    year: "2023",
  },
  {
    name: "2",
    id: "9TIrW5pqtfC9cIKcG5fu",
    title: "expnse trckr",
    year: "2022",
  },
  {
    name: "3",
    id: "PwGLWPa4pgnw1rPS0i1t",
    title: "30 Days Poster",
    year: "2022",
  },
  {
    name: "5",
    id: "SSRFGiddYEQKjXtvLcJG",
    title: "Soft Love Collection",
    year: "2018",
  },
  {
    name: "6",
    id: "SeteUHhdR8xQCoq7wCOX",
    title: "White Collection",
    year: "2018",
  },
  {
    name: "7",
    id: "ANnNgHEr7XJh8persKCy",
    title: "YRC Recruitment",
    year: "2017",
  },
];

export default function Memories() {
  const middleCard = useRef();

  const smiley = useRef();
  const hand = useRef();
  const konichiwa = useRef();

  const preloader = usePreloader();
  //const { data, error, isLoaded } = useFetch(host_url + "/image");
  const navigate = useNavigate();
  const trackContainer = useRef(null);
  const container = useRef(null);

  const [isMouseDown, setMouseDown] = useState(false);
  const isOnTrack = useRef(false);
  const [isTransitioning, setTransitioning] = useState(false);

  const titlesContainer = useRef(null);

  const { height, width } = useDimensions();
  const [isExpanded, setExpanded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      preloader.tl.play();
    }, 1500);

    console.log(height);
    console.log(width);

    initListeners();
    initBorders();
    initAnimations();

    gsap.to(smiley.current, {
      rotation: 360,
      ease: "linear",
      duration: 15,
      repeat: -1,
    });

    const items = document.querySelectorAll(`.overflow-text`);
    initLineBorder(items);

    let icon = document.getElementById("svg-cursor-icon");

    gsap.to(icon, {
      transform: "rotate(90deg)",
      duration: 0.4,
      ease: "power",
    });

    initEye();
  }, []);

  const initEye = () => {};

  const documentOnMouseEnter = () => {
    isOnTrack.current = true;
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    if (!isTransitioning) {
      cursorMagnify(outer, text);
    }
  };

  const initAnimations = () => {
    const tl = gsap
      .timeline({
        repeat: -1,
      })
      .to(hand.current, {
        rotation: 5,
        ease: "easeOut",
        duration: 1,
        transformOrigin: "bottom",
      })
      .to(hand.current, {
        rotation: -5,
        ease: "easeIn",
        duration: 1,
        transformOrigin: "bottom",
      });

    tl.play();
  };

  const initBorders = () => {
    gsap.to(trackContainer.current, {
      transform: `translate(0%, -50%)`,
      duration: 0,
    });
  };

  const initLineBorder = (items) => {
    for (let i = 0; i < items.length; i++) {
      gsap.to(items[i], {
        borderTop: window.innerWidth < 600 ? "1px solid black" : "0px solid black",
        duration: 0,
      });
    }
  };

  const initListeners = () => {
    if (container.current) {
      container.current.addEventListener("mousewheel", (e) => {
        handleMouseScroll(e);
      });
    }

    window.addEventListener("resize", () => {
      window.location.reload();
      const items = document.querySelectorAll(`.overflow-text`);
      initLineBorder(items);
      const images = document.querySelectorAll(`.image`);
      initBorders(images);
      updateAbsolutePosition(0);
    });
  };

  const handleMouseScroll = (e) => {
    if (!isOnTrack.current) return;
    const nextPercentageUnconstrained = parseFloat(trackContainer.current.getAttribute("data-prev-percentage")) + e.wheelDelta / 180;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    updateAbsolutePosition(nextPercentage);
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-prev-percentage", parseFloat(trackContainer.current.getAttribute("data-percentage")));
    }
  };

  const documentOnMouseLeave = () => {
    isOnTrack.current = false;
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    if (!isTransitioning) {
      cursorNormal(outer, text);
    }
  };

  const updateAbsolutePosition = (percentage) => {
    if (trackContainer.current) {
      trackContainer.current.setAttribute("data-percentage", percentage);

      gsap.to(trackContainer.current, {
        transform: `translate(${percentage}%, -50%)`,
        duration: 2,
        ease: "power2.out",
        fill: "forwards",
      });
    }
  };

  const animateIn = (index) => {
    if (isMouseDown) return;
    let title = document.getElementById(`image-title-${index}`);

    textShuffle(title, data[index].title, null, 80, 2);
  };

  const animateOut = (index) => {
    if (isMouseDown) return;
    let title = document.getElementById(`image-title-${index}`);

    textShuffle(title, data[index].title, null, 40, 2);
  };

  const handleNavigate = (index) => {
    let outer = document.getElementById("outer-circle");
    let text = document.getElementById("cursor-text");
    setTransitioning(true);
    cursorNormal(outer, text);
    console.log(preloader);
    preloader.tl.reverse();
    setTimeout(() => {
      navigate("/project/" + index);
    }, 1500);

    setTransitioning(false);
  };
  return width > 800 ? (
    <>
      <m.div className="main-track-container" onMouseEnter={() => documentOnMouseEnter()} onMouseLeave={() => documentOnMouseLeave()} style={{ overflow: "hidden", height: "100vh", top: 0 }} ref={container}>
        <div className="image-track" ref={trackContainer} id="memory-track" data-mouse-down-at="0" data-prev-percentage="0" data-percentage="0">
          <div className="half-window-container">
            <div
              style={{
                width: "100vw",
                position: "absolute",
                top: "50%",
                left: "0%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative-container">
                <div className="center-div">
                  <div
                    className="display"
                    style={{
                      width: "1000px",
                      zIndex: 100,
                      fontSize: "72px",
                      lineHeight: "72px",
                      textAlign: "center",
                    }}
                  >
                    <HelloSvg />
                    <HandSvg />
                    <SmileySvg />
                    Hello, I'm Trung Ha,
                    <br />
                    <span className="serif-italic">(tech enthusiast & developer).</span>
                    <br />
                    Currently based in Hanoi.
                  </div>
                  <div
                    ref={middleCard}
                    onClick={() => {
                      if (!isExpanded) {
                        setExpanded(true);
                      } else {
                        setExpanded(false);
                      }
                    }}
                    style={{
                      minWidth: "200px",
                      borderRadius: "10px",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      zIndex: -1,
                      transform: "translate(-50%, -50%)",
                      height: "80vh",
                      width: "10vw",
                      marginBottom: "50px",
                      backgroundSize: "cover",
                      backgroundImage: `url(${process.env.PUBLIC_URL}/gradients/2.jpg)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {data.map((image, index) => (
              <div onMouseEnter={() => animateIn(index)} onMouseLeave={() => animateOut(index)} onClick={() => handleNavigate(index)} className="img-container" id={`image-${index}`} key={`image-${index}`}>
                <img
                  style={{
                    width: randomInteger(200, 400) + "px",
                    height: randomInteger(200, 700) + "px",
                  }}
                  preserveAspectRatio="xMidYMid slice"
                  id={`image-div-${index}`}
                  className="image"
                  src={`${process.env.PUBLIC_URL}/gradients/` + image.name + `.jpg`}
                  alt={image.name}
                  draggable="false"
                />
                <div className="title-row">
                  [0{index + 1}] - [{data[index].year}]
                </div>
                <div id={`image-title-${index}`}>{data[index].title}</div>
              </div>
            ))}
          </div>
          <div className="half-window-container"></div>
        </div>
      </m.div>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <div className="bottom-div">
          <Grid container columns={12}>
            <Grid display="flex" item xs={12} sm={3} justifyContent="space-between">
              <div className="ideas-row-text med">
                [ <span ref={titlesContainer}>space. 01</span> ]
              </div>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  ) : (
    <>
      <MobileMain />
    </>
  );

  function SmileySvg() {
    return (
      <svg ref={smiley} className="smiley-svg" xmlns="http://www.w3.org/2000/svg" width="210" height="210" viewBox="0 0 211 211" fill="none">
        <path d="M210.163 105.163C210.163 163.153 163.153 210.163 105.163 210.163C47.1732 210.163 0.163086 163.153 0.163086 105.163C0.163086 47.1729 47.1732 0.162842 105.163 0.162842C163.153 0.162842 210.163 47.1729 210.163 105.163Z" fill="#FEDC0D" />
        <path d="M80.9503 82.5033C80.9503 94.8415 78.3783 104.844 75.2056 104.844C72.0329 104.844 69.4609 94.8415 69.4609 82.5033C69.4609 70.165 72.0329 60.1628 75.2056 60.1628C78.3783 60.1628 80.9503 70.165 80.9503 82.5033Z" fill="black" />
        <path d="M142.865 82.5033C142.865 94.8415 140.293 104.844 137.121 104.844C133.948 104.844 131.376 94.8415 131.376 82.5033C131.376 70.165 133.948 60.1628 137.121 60.1628C140.293 60.1628 142.865 70.165 142.865 82.5033Z" fill="black" />
        <path
          d="M47.2381 105.163C45.5398 105.163 44.1549 106.54 44.2412 108.237C44.5952 115.197 46.1497 122.054 48.8445 128.507C51.9352 135.907 56.4652 142.632 62.176 148.296C67.8868 153.961 74.6665 158.454 82.1281 161.519C89.5896 164.585 97.5868 166.163 105.663 166.163C113.739 166.163 121.737 164.585 129.198 161.519C136.66 158.454 143.439 153.961 149.15 148.296C154.861 142.632 159.391 135.907 162.482 128.507C165.176 122.054 166.731 115.197 167.085 108.237C167.171 106.54 165.786 105.163 164.088 105.163C162.39 105.163 161.022 106.541 160.926 108.236C160.578 114.395 159.185 120.46 156.8 126.172C154.018 132.833 149.941 138.885 144.801 143.983C139.662 149.081 133.56 153.125 126.845 155.884C120.129 158.643 112.932 160.063 105.663 160.063C98.3944 160.063 91.1969 158.643 84.4816 155.884C77.7662 153.125 71.6644 149.081 66.5247 143.983C61.385 138.885 57.3079 132.833 54.5264 126.172C52.1407 120.46 50.748 114.395 50.3999 108.236C50.304 106.541 48.9364 105.163 47.2381 105.163Z"
          fill="black"
        />
      </svg>
    );
  }

  function HandSvg() {
    return (
      <svg ref={hand} className="hand-svg" xmlns="http://www.w3.org/2000/svg" width="255" height="287" viewBox="0 0 255 287" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M120.83 88.2688L120.83 17.7688C120.83 8.10382 112.995 0.268799 103.33 0.268799C93.6646 0.268796 85.8296 8.10381 85.8296 17.7688L85.8296 88.2688H81.8296L81.8296 33.2688C81.8296 23.88 74.2184 16.2688 64.8296 16.2688C55.4408 16.2688 47.8296 23.88 47.8296 33.2688L47.8296 88.2688H44.8296L44.8296 51.2688C44.8296 40.7754 36.323 32.2688 25.8296 32.2688C15.3362 32.2688 6.8296 40.7754 6.82959 51.2688L6.82959 98.1688C6.82959 99.3109 6.82959 100.339 6.83867 101.269C6.8296 102.2 6.8296 103.227 6.8296 104.369V175.869C6.8296 198.648 6.8296 210.038 11.3331 218.708C15.1281 226.014 21.0849 231.97 28.3906 235.765C37.0602 240.269 48.45 240.269 71.2296 240.269H94.4296C117.209 240.269 128.599 240.269 137.269 235.765C144.574 231.97 150.531 226.014 154.326 218.708C158.83 210.038 158.83 198.648 158.83 175.869V186.269C177.055 186.269 191.83 171.494 191.83 153.269V120.769C191.83 111.656 184.442 104.269 175.33 104.269C166.217 104.269 158.83 111.656 158.83 120.769V104.369C158.83 101.565 158.83 99.4509 158.695 97.7688C158.83 96.0867 158.83 93.9729 158.83 91.1688V37.2688C158.83 27.88 151.218 20.2688 141.83 20.2688C132.441 20.2688 124.83 27.88 124.83 37.2688L124.83 88.2688H120.83Z"
          fill="#F4B740"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M114.83 88.2688L114.83 17.7688C114.83 8.10382 106.995 0.268799 97.3296 0.268799C87.6646 0.268796 79.8296 8.10381 79.8296 17.7688L79.8296 88.2688H75.8296L75.8296 33.2688C75.8296 23.88 68.2184 16.2688 58.8296 16.2688C49.4408 16.2688 41.8296 23.88 41.8296 33.2688L41.8296 88.2688H38.8296L38.8296 51.2688C38.8296 40.7754 30.323 32.2688 19.8296 32.2688C9.33619 32.2688 0.829596 40.7754 0.829594 51.2688L0.82959 98.1688C0.82959 99.3109 0.82959 100.339 0.838672 101.269C0.829596 102.2 0.829596 103.227 0.829596 104.369V175.869C0.829596 198.648 0.829596 210.038 5.33306 218.708C9.12808 226.014 15.0849 231.97 22.3906 235.765C31.0602 240.269 42.45 240.269 65.2296 240.269H88.4296C111.209 240.269 122.599 240.269 131.269 235.765C138.574 231.97 144.531 226.014 148.326 218.708C152.83 210.038 152.83 198.648 152.83 175.869V186.269C171.055 186.269 185.83 171.494 185.83 153.269V120.769C185.83 111.656 178.442 104.269 169.33 104.269C160.217 104.269 152.83 111.656 152.83 120.769V104.369C152.83 101.565 152.83 99.4509 152.695 97.7688C152.83 96.0867 152.83 93.9729 152.83 91.1688V37.2688C152.83 27.88 145.218 20.2688 135.83 20.2688C126.441 20.2688 118.83 27.88 118.83 37.2688L118.83 88.2688H114.83Z"
          fill="#EB3347"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.8296 174.361C36.8546 161.269 55.6303 152.269 77.3296 152.269C99.0289 152.269 117.805 161.269 126.83 174.361C117.805 187.453 99.0289 196.453 77.3296 196.453C55.6303 196.453 36.8546 187.453 27.8296 174.361Z"
          fill="#F5F5F5"
        />
        <circle cx="77.6696" cy="174.109" r="15.84" fill="#EB3347" />
        <ellipse cx="76.9476" cy="174.189" rx="8.118" ry="7.92" fill="#F5F5F5" />
        <rect width="4.87935" height="24.9946" rx="2.43968" transform="matrix(0.887439 -0.460925 0.540116 0.84159 35.8296 127.667)" fill="#EBEBEB" />
        <rect x="74.8296" y="118.269" width="5" height="24" rx="2.5" fill="#EBEBEB" />
        <rect width="4.87935" height="24.9946" rx="2.43968" transform="matrix(0.887439 0.460925 -0.540116 0.84159 114.33 125.867)" fill="#EBEBEB" />
      </svg>
    );
  }

  function HelloSvg() {
    return (
      <svg ref={konichiwa} className="hello-svg" xmlns="http://www.w3.org/2000/svg" width="61" height="272" viewBox="0 0 61 272" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 0C8.9543 0 0 8.95431 0 20V272H40.4444C51.4901 272 60.4444 263.046 60.4444 252V0H20ZM17.2946 22.5049C19.0757 27.143 22.8603 27.6731 27.491 27.8939C28.0253 27.8939 28.0698 28.0264 27.6691 28.3798C26.3778 29.4399 24.107 31.251 22.3705 32.4878L22.8158 33.1946C26.7786 31.4277 30.7413 29.9258 33.4128 29.2191C34.6965 28.8653 36.0374 28.6249 37.2524 28.407C37.5545 28.3529 37.8488 28.3001 38.1325 28.2473C39.7354 27.9823 40.4478 27.2755 40.4478 26.0829C40.4478 24.4043 37.0194 22.9908 34.9267 22.9908C34.1227 22.9908 33.4574 23.1596 32.6272 23.3702C31.2506 23.7194 29.4209 24.1835 25.7545 24.1835C22.1479 24.1835 20.3669 23.7418 17.829 22.019L17.2946 22.5049ZM17.072 40.1296C17.5173 46.3578 19.3873 49.8474 28.1588 49.8474C32.966 49.8474 36.1318 48.8922 38.0246 48.3211L38.0246 48.3211C38.8317 48.0775 39.4073 47.9039 39.78 47.9039C41.3829 47.9039 44.0989 48.8756 44.0989 50.7309C44.0989 52.1444 43.6091 52.6744 41.65 53.3812C39.2011 54.2205 34.7486 54.8389 29.6282 54.8389C16.6268 54.8389 13.7326 48.6548 16.226 40.1296H17.072ZM23.7508 68.6095L23.8399 67.9911C24.9085 67.5935 26.6005 67.4168 27.58 67.5935C31.0975 68.0794 33.4128 70.8181 33.4128 72.585C33.4128 73.2425 32.8347 73.6965 32.0888 74.2822C31.6822 74.6015 31.2257 74.96 30.7858 75.412C28.515 77.6648 24.6413 82.6562 22.8158 85.6599C22.6377 85.9249 22.7713 86.0574 23.0384 85.9249C25.2202 84.8206 27.2238 84.3789 28.6486 84.3789C32.4333 84.3789 34.4814 86.2783 34.7486 89.6354C34.871 91.0929 34.8462 92.4669 34.8187 93.9871V93.9871C34.8062 94.6783 34.7931 95.3997 34.7931 96.1729C34.7931 98.3815 36.0398 99.0882 37.8208 99.0882C42.5851 99.0882 46.5033 93.8759 48.3734 89.1053L49.0858 89.282C48.1062 99.6624 42.7186 103.991 36.5296 103.991C32.2997 103.991 29.9844 101.65 29.9399 97.9839C29.9164 96.4008 30.0413 94.9772 30.1648 93.5708C30.2756 92.3088 30.3851 91.0607 30.3851 89.7237C30.3851 87.8685 29.7172 86.3667 27.3129 86.3667C23.7063 86.3667 20.5895 90.2538 18.9866 93.9201C18.1772 95.7508 17.5562 97.675 17.0036 99.3869L17.0036 99.387C16.7963 100.029 16.5985 100.642 16.4041 101.208C15.9144 102.578 15.1129 103.77 13.4209 103.77C11.7735 103.77 10.7939 102.092 10.7939 100.458C10.7939 98.6756 12.2411 96.3353 14.0334 93.4367L14.0335 93.4365C14.5515 92.5989 15.0982 91.7147 15.6472 90.7839C16.7538 88.871 18.4035 86.0999 20.0992 83.2515L20.0992 83.2513C22.9065 78.5357 25.84 73.6079 26.645 72.0107C27.0902 71.1715 26.9567 70.5531 26.4669 70.1113C25.799 69.4929 24.5968 68.9629 23.7508 68.6095ZM38.3997 120.986C35.0603 120.986 30.2961 122.135 26.8676 125.139L27.1793 125.89C30.9194 124.918 33.0566 124.741 34.3924 124.741C37.6873 124.741 37.4646 125.227 36.9749 125.757C36.3328 126.513 34.4252 128.095 32.6532 129.564C32.4589 129.725 32.2662 129.885 32.0771 130.042L32.6559 130.704C35.0158 129.291 37.9989 127.877 40.0026 127.259C41.1608 126.885 42.2437 126.755 43.2267 126.636C43.7554 126.573 44.2552 126.512 44.7223 126.42C45.8354 126.199 46.4588 125.669 46.4588 124.564C46.4588 123.813 46.058 122.93 44.6778 122.179C43.1639 121.34 41.3829 120.986 38.3997 120.986ZM26.5663 137.723L26.5559 137.684L25.799 137.772C25.6654 138.788 25.6209 140.157 25.799 141.482C26.5114 146.562 29.9844 150.184 38.3997 150.184C43.7427 150.184 48.2398 149.61 48.2398 146.827C48.2398 145.193 46.2361 144.309 44.3661 144.309C44.0742 144.309 43.6956 144.391 43.1748 144.504C42.0269 144.751 40.188 145.149 37.0639 145.149C31.5428 145.149 29.4501 144 27.7136 140.996C27.1862 140.081 26.8323 138.735 26.5663 137.723ZM14.8903 122.665C14.8903 120.633 13.7326 118.734 12.6195 117.497L13.0647 117.011C14.4896 117.32 15.4691 117.762 16.5377 118.425C17.918 119.352 20.3669 121.782 20.3669 124.167C20.3669 125.143 19.9513 125.898 19.2513 127.171C19.0639 127.512 18.8561 127.89 18.6304 128.319C16.983 131.279 15.291 135.342 15.291 139.053C15.291 140.422 15.4691 141.35 15.7363 141.88C16.0479 142.498 16.4041 142.587 16.8494 141.88C17.9625 140.29 20.2779 136.093 21.4355 133.885L22.3705 134.282C22.0755 135.13 21.6884 136.143 21.2943 137.176L21.2942 137.176L21.2942 137.176L21.2941 137.176C20.5581 139.104 19.7974 141.096 19.5654 142.189C19.1647 143.912 18.9866 144.884 18.9866 145.59C18.9866 146.387 19.2348 147.172 19.4754 147.932C19.7019 148.649 19.9216 149.344 19.9216 150.008C19.9216 151.598 19.1202 152.481 17.6954 152.481C16.5822 152.481 15.5136 151.686 14.6231 150.493C13.0202 148.285 11.9071 144.839 11.9071 139.892C11.9071 135.871 13.1276 131.331 13.8435 128.669L13.8662 128.584C14.445 126.42 14.8903 124.653 14.8903 122.665ZM11.5064 169.962C13.6436 171.994 15.7808 172.789 18.5859 172.789C19.5295 172.789 20.5034 172.731 21.4809 172.626C21.8531 170.712 22.1396 168.993 22.237 167.93C22.326 166.87 22.1479 166.605 21.391 166.163C20.7598 165.788 20.0093 165.53 18.9515 165.168L18.764 165.103V164.441C19.9662 163.955 20.9903 163.601 22.0589 163.601C25.0421 163.601 28.0253 165.015 28.0253 166.252C28.0253 166.857 27.7499 167.235 27.4089 167.703C27.0781 168.157 26.6854 168.695 26.4224 169.609C26.2254 170.26 26.0284 171.018 25.8156 171.873C28.1365 171.321 30.2292 170.581 31.6763 169.83C32.2257 169.544 32.6734 169.299 33.0416 169.099C33.8672 168.649 34.2934 168.416 34.5705 168.416C35.8172 168.416 38.5778 168.725 38.5778 170.536C38.5778 171.729 37.6873 172.524 35.6836 173.319C33.7277 174.059 29.5637 175.313 24.7765 176.005C24.1804 178.252 23.4588 180.832 22.9044 182.814C22.6009 183.899 22.3476 184.805 22.1924 185.378C22.0589 185.953 22.1479 186.085 22.6822 185.732C27.1348 182.949 30.7413 181.182 35.1493 181.182C42.2289 181.182 45.4792 185.467 45.4792 190.193C45.4792 198.895 33.7245 202.031 22.3705 201.015L22.2815 200.088C25.6209 199.778 28.9603 199.072 31.988 197.879C38.5333 195.538 40.4478 192.048 40.4478 188.735C40.4478 185.732 38.4442 183.037 34.7041 183.037C29.8953 183.037 24.7749 188.029 21.9253 191.474C21.645 191.794 21.4089 192.188 21.1752 192.578C20.6663 193.427 20.1691 194.257 19.2538 194.257C17.829 194.257 16.3596 191.651 16.3596 189.795C16.3596 189.427 16.4863 189.215 16.7207 188.823C16.8794 188.558 17.0875 188.21 17.3392 187.675C18.3024 185.879 19.7657 180.212 20.6617 176.429C19.8831 176.475 19.1001 176.5 18.3187 176.5C14.4896 176.5 12.664 175.528 10.883 170.36L11.5064 169.962ZM24.7304 221.191L24.1961 221.632C26.4224 226.536 28.6931 226.933 31.5428 226.933C32.9148 226.933 34.3566 226.831 35.774 226.665C35.7731 227.027 35.7727 227.383 35.7727 227.728C35.7727 230.41 35.9428 233.444 36.0825 235.936L36.1119 236.46C35.4641 236.412 34.7875 236.386 34.0807 236.386C28.9158 236.386 24.4632 238.285 24.4632 242.658C24.4632 246.457 28.0253 248.533 32.0325 248.533C37.9544 248.533 40.6705 246.369 40.6705 242.128C40.6705 242.098 40.6704 242.067 40.6702 242.036C40.6699 241.997 40.6695 241.957 40.6689 241.916C41.8086 242.615 42.9315 243.476 44.0544 244.514C44.2254 244.663 44.3856 244.805 44.5368 244.939L44.5374 244.939C45.7239 245.99 46.352 246.546 47.2602 246.546C48.4624 246.546 49.2193 245.706 49.2193 244.204C49.2193 243.188 48.7296 242.261 47.75 241.289C46.2736 239.884 43.9204 238.135 40.2627 237.151C39.9937 234.641 39.6909 231.555 39.6909 227.772C39.6909 227.198 39.6999 226.619 39.7164 226.047C42.1101 225.579 44.102 225.024 45.0785 224.636C47.1267 223.841 47.8836 223.488 47.8836 222.074C47.8836 220.705 46.058 219.954 44.4551 219.91C44.3664 219.91 44.1745 219.997 43.8403 220.15L43.8401 220.15C43.191 220.447 42.0053 220.989 39.9963 221.61C40.1165 220.405 40.2599 219.393 40.4033 218.717C40.5297 217.965 40.7059 217.48 40.8565 217.065C41.0242 216.603 41.1602 216.228 41.1602 215.669C41.1602 214.432 38.3552 212.886 35.3719 212.886C34.1698 212.886 32.4778 213.858 31.3201 214.609L31.4537 215.316C32.5669 215.448 33.7245 215.669 34.6595 216.023L34.6965 216.038C35.4295 216.337 35.8172 216.495 35.8172 218.32C35.8172 218.988 35.8097 220.116 35.8009 221.448L35.8009 221.449L35.7925 222.749C34.3253 223.029 32.6482 223.223 30.7858 223.223C28.9158 223.223 26.9567 222.648 24.7304 221.191ZM36.2624 240.011C34.7721 239.616 33.2242 239.434 31.5873 239.434C29.0939 239.434 26.6005 240.494 26.6005 242.349C26.6005 243.984 28.5596 244.646 30.6523 244.646C35.1938 244.646 36.2625 243.144 36.2625 240.052L36.2624 240.011ZM12.2633 212.931L11.7735 213.416C12.9312 214.742 14.1333 216.641 14.1333 218.673C14.0888 220.617 13.6436 222.428 13.0647 224.548C12.3523 227.198 11.1056 232.455 11.1056 236.518C11.1056 241.598 12.2188 245.353 13.8662 247.561C14.7567 248.754 15.7808 249.549 16.8939 249.549C18.3187 249.549 19.1202 248.622 19.1202 247.031C19.1202 246.399 18.9275 245.726 18.7261 245.023C18.5054 244.253 18.2742 243.445 18.2742 242.614C18.2742 241.907 18.4523 240.98 18.853 239.257C19.2983 237.623 20.7676 233.471 21.6136 231.085L20.6341 230.644C20.3211 231.241 19.9169 232.032 19.4736 232.899L19.4727 232.901L19.4725 232.901L19.4722 232.902C18.276 235.243 16.7948 238.141 16.0479 239.301C15.6027 239.964 15.1574 239.92 14.8458 239.257C14.5786 238.639 14.4005 237.49 14.4005 236.121C14.4005 231.704 16.226 227.242 17.829 224.327C18.114 223.749 18.3749 223.267 18.603 222.846C19.1944 221.753 19.5654 221.067 19.5654 220.175C19.5654 217.745 17.1165 215.228 15.7363 214.344C14.6677 213.637 13.7326 213.284 12.2633 212.931Z"
          fill="#0F59E9"
        />
      </svg>
    );
  }
}

const ContactMe = () => {
  function sendMail() {
    var link = "mailto:ha.the.trung.1698@gmail.com" + "?cc=ha.the.trung.1698@gmail.com" + "&subject=" + encodeURIComponent("This is my subject") + "&body=" + encodeURIComponent(document.getElementById("myText").value);
    window.location.href = link;
  }

  return (
    <Grid container spacing={4}>
      <Grid item sm={12} md={2}></Grid>
      <Grid item sm={12} md={8}>
        <Grid container>
          <h1 className="display-font s-64" style={{ lineHeight: "70px" }}>
            Let's get in touch.
          </h1>
          <p id="myText">Feel free to drop me a line!</p>
          <Grid container>
            <Grid item sm={12} md={6}></Grid>
            <Grid item sm={12} md={6}></Grid>
            <Grid item sm={12} md={6}>
              <p>Hanoi</p>
            </Grid>
            <Grid item sm={12} md={3}>
              <p>
                {new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Bangkok",
                })}
              </p>
            </Grid>
          </Grid>
          <br />
          <Divider
            sx={{
              border: "0.5px solid #d6ff0a",
              marginBottom: "20px",
            }}
          />
          <h1 className="display-font s-64">Contact</h1>
          <Grid container>
            <Grid item sm={12} md={6} onClick={() => sendMail()}>
              <p>ha.the.trung.1698@gmail.com</p>
            </Grid>

            <Grid item sm={12} md={3}>
              <p>(+84) 818 16 1998</p>
            </Grid>
          </Grid>
          <br />
          <Divider
            sx={{
              border: "0.5px solid #d6ff0a",
              marginBottom: "20px",
            }}
          />
          <h1 className="display-font s-64">Social</h1>
          <Grid container>
            <Grid item sm={12} md={3}>
              <p>Facebook</p>
            </Grid>
            <Grid item sm={12} md={3}>
              <p>GitHub</p>
            </Grid>
            <Grid item sm={12} md={3}>
              <p>LinkedIn</p>
            </Grid>
            <Grid item sm={12} md={3}>
              <p>Behance</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const AboutMe = () => {
  return (
    <>
      <div className="entry-item" style={{ marginRight: "150px", width: "300px" }}>
        <div className="center-div">
          <div className="introduction-paragraph">
            <h3 className="display-font s-64" style={{ lineHeight: "70px" }}>
              About Me
            </h3>
          </div>
        </div>
      </div>
      <div className="entry-item" style={{ marginRight: "20px", width: "60vw" }}>
        <div className="center-div">
          <Grid container spacing={4}>
            <Grid item sm={12} md={8}>
              <div className="introduction-paragraph">
                <p>
                  I’m a developer located in Hanoi, Vietnam. In 2020 I graduated from the Foregin Trade University as a bachelor in Business Japanese. However, after decided that it was not the path that I want to follow. I attended in University of Greenwich in Computer Science
                  and graduated with First Class Honours.
                </p>
                <p>Currently, I'm working at Toshiba Software Development Vietnam (TSDV) as a back-end developer. However, my side-hobby is to create flashy & dope shits (who doesn't tbh). This portfolio was made during my lunchbreaks as a method to keep myself fresh.</p>
                <br />
              </div>
            </Grid>
            <Grid item sm={12} md={1}></Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
