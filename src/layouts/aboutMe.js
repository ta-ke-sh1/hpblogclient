import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StoryCard from "../components/card/storyCard";
import { randomInteger } from "../utils/utils";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";

const story = (
    <>
        <p className="paragraph">
            Previously studied Business Japanese at Foreign Trade University of Vietnam, yet somewhere along the line I realized that it was not the right path for me. So I enrolled into University of Greenwich and studied software engineering, mainly because I had been tinkering
            with computer since the age of 3.
        </p>
        <p className="paragraph">
            Currently I'm working mainly in backend development in Toshiba Software Development Vietnam. But as side hobby, I also like to explore on the field visual & creative coding to keep myself fresh & away from the chains of capitalism. This portfilio was made during my
            lunch breaks
        </p>
    </>

);

const img = <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/me.webp"})` }} id="about-img"></div>;

export default function AboutMe() {
    const hello = useRef(null);
    const rowContaier = useRef(null);
    const overContainer = useRef(null);

    const [addable, updateAddable] = useState(true);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setCards([]);
        })
        gsap.registerPlugin(Draggable);
    }, []);

    const handleZoomIn = (index, title) => {
        if (addable) {
            updateAddable(false)
            let maxWidth = window.innerWidth * 0.65;
            let maxHeight = window.innerHeight * 0.7;

            let pos = {
                x: randomInteger(20, maxWidth),
                y: randomInteger(20, maxHeight)
            }

            let id = 'window-' + Math.floor(Date.now());

            let newCard = <StoryCard className={"draggable"} key={id} id={id} pos={pos} children={story} title={title} />

            if (cards.length < 5) {
                setCards([...cards, newCard]);
            } else {
                setCards([...cards, newCard].slice(1));
            }

            setTimeout(() => {
                updateAddable(true);
            }, 200)
        }

    };

    const handleZoomOut = () => {

    };

    return (
        <div className="about-container">
            <div className="fullpage" ref={overContainer} onClick={() => handleZoomOut()}>{cards}</div>
            <div className="center-align-text mb-20vh">
                <h1 className="title">
                    <span ref={hello}>Hello!</span>
                    <br />
                    I'm a freshly graduated <br /> <span >code writer</span>
                </h1>
                <div className="row" ref={rowContaier}>
                    <div className="button-container" id="btn-container-1">
                        <div className="button" id="card-1" style={{ backgroundColor: "coral" }}></div>
                        <div className="card-clone" onClick={() => handleZoomIn(1, 'About Me')} style={{ backgroundColor: "coral" }}></div>
                    </div>
                    <div className="button-container">
                        <div className="button" id="card-2" style={{ backgroundColor: "#F99B7D" }}></div>
                        <div className="card-clone" onClick={() => handleZoomIn(2)} style={{ backgroundColor: "#F99B7D" }}></div>
                    </div>
                    <div className="button-container">
                        <div className="button" id="card-3" style={{ backgroundColor: "#E76161" }}></div>
                        <div className="card-clone" onClick={() => handleZoomIn(3)} style={{ backgroundColor: "#E76161" }}></div>
                    </div>
                    <div className="button-container">
                        <div className="button" id="card-4" style={{ backgroundColor: "#B04759" }}></div>
                        <div className="card-clone" onClick={() => handleZoomIn(4)} style={{ backgroundColor: "#B04759" }}></div>
                    </div>
                    <div className="button-container">
                        <div className="button" id="card-5" style={{ backgroundColor: "#8BACAA" }}></div>
                        <div className="card-clone" onClick={() => handleZoomIn(5)} style={{ backgroundColor: "#8BACAA" }}></div>
                    </div>
                </div>
            </div>
            <div className="bottom-div">
                <Grid container justify="space-between" columns={12}>
                    <Grid item xs={12} sm={2}>
                        <div className="details-text med" style={{ marginLeft: "1.5vw" }}>
                            [ GitHub ]
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className="details-text med">[ Instagram ]</div>
                    </Grid>
                    <Grid item xs={12} sm={2} display={"flex"} justifyContent="flex-end">
                        <div className="details-text med">[ Facebook ]</div>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid display="flex" justifyContent="space-between" item xs={12} sm={4}>
                        <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
                            (+84) 818 161 998
                        </div>
                        <div style={{ zIndex: 10 }} display={"inline-flex"} className="ideas-row-text med">
                            Send me an email
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );


}
