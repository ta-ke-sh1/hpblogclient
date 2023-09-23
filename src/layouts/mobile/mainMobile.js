import { Grid } from "@mui/material";
import { usePreloader } from "../../animation/preloader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cursorNormal } from "../../utils/utils";
import GradientMap from "../../components/gradient/gradient";

export default function MobileMain() {
  const data = [
    {
      name: "28",
      id: "9TIrW5pqtfC9cIKcG5fu",
      title: "expnse trckr",
      year: "2022",
    },
    {
      name: "26",
      id: "PwGLWPa4pgnw1rPS0i1t",
      title: "30 Days Poster",
      year: "2022",
    },
    {
      name: "4",
      id: "9TIrW5pqtfC9cIKcG5fu",
      title: "Snkr E-commerce",
      year: "2020",
    },
    {
      name: "5",
      id: "SSRFGiddYEQKjXtvLcJG",
      title: "Secret Society",
      year: "2019",
    },
    {
      name: "24",
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

  const [transitioning, setTransitioning] = useState(false);

  const preloader = usePreloader();
  //const { data, error, isLoaded } = useFetch(host_url + "/image");
  const navigate = useNavigate();

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

  return (
    <>
      <div className="main-mobile-container">
        <div className="img-mobile-card">
          <img
            className="overlay"
            src={`${process.env.PUBLIC_URL + "/about/legend.gif"}`}></img>
        </div>
        {/* {data.map((image, index) => (
          <div className="img-mobile-card" onClick={() => handleNavigate(index)} id={`image-${index}`} key={`image-${index}`}>
            <div className="mobile-content">
              <div>
                [0{index + 1}] - [{data[index].year}]
              </div>
              <div id={`image-title-${index}`}>{data[index].title}</div>
            </div>
            <img id={`image-div-${index}`} className="mobile-image" src={`${process.env.PUBLIC_URL}/projects/30_days/day ` + image.name + `.jpg`} alt={image.name} draggable="false" />
          </div>
        ))} */}
      </div>
    </>
  );
}
