import { Grid, Divider } from "@mui/material";
import { usePreloader } from "../../animation/preloader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cursorNormal } from "../../utils/utils";

export default function MobileMain() {
  const data = [
    {
      name: "1",
      id: "9TIrW5pqtfC9cIKcG5fu",
      title: "expnse trckr",
      year: "2022",
    },
    {
      name: "2",
      id: "PwGLWPa4pgnw1rPS0i1t",
      title: "30 Days Poster",
      year: "2022",
    },
    {
      name: "3",
      id: "9TIrW5pqtfC9cIKcG5fu",
      title: "Snkr E-commerce",
      year: "2020",
    },
    {
      name: "4",
      id: "SSRFGiddYEQKjXtvLcJG",
      title: "Secret Society",
      year: "2019",
    },
    {
      name: "5",
      id: "SeteUHhdR8xQCoq7wCOX",
      title: "White Collection",
      year: "2018",
    },
    {
      name: "6",
      id: "ANnNgHEr7XJh8persKCy",
      title: "YRC Recruitment",
      year: "2017",
    },
  ];

  const [transitioning, setTransitioning] = useState(false);

  const bg = `${process.env.PUBLIC_URL}/gradients/4.jpg`;
  const bg_2 = `${process.env.PUBLIC_URL}/about/cropped.jpg`;

  const preloader = usePreloader();
  //const { data, error, isLoaded } = useFetch(host_url + "/image");
  const navigate = useNavigate();

  const handleClick = (index) => {
    console.log(index);

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
          <div className="mobile-content">
            <div className="title">
              <div className="display-font s-128 main-title">Trung. Ha</div>
              <p>
                <Grid
                  container
                  columns={12}
                  sx={{
                    width: "100vw",
                  }}
                >
                  <Grid item xs={4} sm={4} md={4}>
                    [Folio. 01]
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    Hanoi
                  </Grid>
                  <Grid item xs={5} sm={5} md={4}>
                    {new Date().toLocaleString("en-US", {
                      timeZone: "Asia/Bangkok",
                    })}
                  </Grid>
                </Grid>
              </p>
            </div>
          </div>

          <img className="mobile-image" src={bg} draggable="false" />
        </div>

        <div
          className="img-mobile-card"
          style={{
            marginBottom: "200px",
          }}
        >
          <div className="mobile-content">
            <div className="title">
              <p>A freshly graduated code writer, and currently working as a back-end developer at Toshiba. However, my side-hobby is to create flashy & dope shits (who doesn't tbh).</p>
              <p>This portfolio was made during my lunchbreaks as a method to keep myself fresh.</p>
            </div>
          </div>
          <img className="mobile-image" src={bg_2} draggable="false" />
        </div>
        <div className="projects">
          {data.map((image, index) => (
            <div className="project-item" onClick={() => handleClick(index)}>
              <img preserveAspectRatio="xMidYMid slice" id={`image-div-${index}`} className="image" src={`${process.env.PUBLIC_URL}/gradients/` + image.name + `.jpg`} alt={image.name} draggable="false" />
              <div className="project-item-index">[0{index + 1}]</div>
              <div className="project-item-title">
                <div>
                  <span className="display-font s-48 ">{data[index].title + " "} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="img-mobile-card">
          <div
            className="contact-content"
            style={{
              padding: "20px 30px",
            }}
          >
            <h1 className="display-font s-64">Let's get in touch.</h1>
            <p id="myText">Feel free to drop me a line!</p>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <p>Hanoi</p>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <p>
                  {new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Bangkok",
                  })}
                </p>
              </Grid>
            </Grid>
            <br />
            <h1 className="display-font s-64">Contact</h1>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <p>ha.the.trung.1698@gmail.com</p>
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <p>(+84) 818 16 1998</p>
              </Grid>
            </Grid>
            <br />
            <h1 className="display-font s-64">Social</h1>
            <Grid container>
              <Grid item xs={12} sm={12} md={3}>
                <p>Facebook</p>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <p>GitHub</p>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <p>LinkedIn</p>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <p>Behance</p>
              </Grid>
            </Grid>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
