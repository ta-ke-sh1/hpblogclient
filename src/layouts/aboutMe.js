import { Grid } from "@mui/material";



export default function AboutMe() {
    return (
        <div className="about-container">
            <Grid container>
                <Grid item xs={12} md={6}>
                    <h1>Hello,</h1>
                    <h1>I'm a freshly graduated coding user who is currently working mainly as a backend dev.
                        But, I like to explore on boundaries of visual & creative coding</h1>
                </Grid>
                <Grid xs={12} md={6}>
                    <p>
                        To be honest, I don't have much to say. I just like to code :d
                    </p>
                </Grid>
            </Grid>
            <br /><br />
            <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/me.webp"})` }} id="about-img">
            </div>
            <br /><br />
            <Grid container>
                <Grid item xs={12} md={2}>
                    <p>1</p>
                </Grid>
                <Grid item xs={12} md={2}>
                    <p>Education</p>
                </Grid>
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={2}>
                    <p> 2020 - 2023</p>
                    <br /><br />
                    <p> 2016 - 2020</p>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div>
                        <h3>University of Greenwich Vietnam</h3>
                        <p>Software Engineering</p>
                    </div>
                    <br />
                    <div>
                        <h3>Foreign Trade University</h3>
                        <p>Business Japanese</p>
                    </div>
                </Grid>
            </Grid>
            <br /><br />
            <br /><br />
            <Grid container>
                <Grid item xs={12} md={2}>
                    <p>2</p>
                </Grid>
                <Grid item xs={12} md={2}>
                    <p>Academic Awards</p>
                </Grid>
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={2}>
                    <p>Oct 2020 - Feb 2023</p>
                    <br />
                    <p>July 2021</p>
                </Grid>

                <Grid item xs={12} md={4}>
                    <p>Top 3 Student of Department <br />5 (out of 7) Semesters</p>
                    <p>Top 8 Greenwich Coding Challenge v2.2</p>
                    <p></p>
                </Grid>
            </Grid>
            <br /><br />
            <br /><br />
            <Grid container>
                <Grid item xs={12} md={2}>
                    <p>3</p>
                </Grid>
                <Grid item xs={12} md={2}>
                    <p>Work Experiences</p>
                </Grid>
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={2}>
                    <p>May 2023 - Present</p>
                    <br /><br /><br />
                    <p>Oct 2022 - April 2023</p>
                </Grid>
                <Grid item xs={12} md={2}>
                    <div>
                        <h3>Toshiba Software Development Vietnam (TSDV)</h3>
                        <p>Software Engineer </p>
                    </div>
                    <br />
                    <div>
                        <h3>Toshiba Software Development Vietnam (TSDV)</h3>
                        <p>Internship</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={2}>
                </Grid>
            </Grid>
            <br /><br />
            <br /><br />
            <Grid container>
                <Grid item xs={12} md={2}>
                    <p>4</p>
                </Grid>
                <Grid item xs={12} md={2}>
                    <p>Toolset</p>
                </Grid>
                <Grid item xs={12} md={2}>

                </Grid>
                <Grid item xs={12} md={2}>
                    <p>Back End</p>
                    <p className="invisible">.</p>
                    <p className="invisible">.</p>
                    <p>Front End</p>
                    <p className="invisible">.</p>
                    <p>Mobile</p>
                    <p className="invisible">.</p>
                    <p>Database</p>
                </Grid>
                <Grid item xs={12} md={4}>
                    <p>Node.js</p>
                    <p>Spring Boot</p>
                    <p>Go</p>
                    <p>React.js</p>
                    <p>GSAP</p>
                    <p>Flutter</p>
                    <p>Android Native (Java)</p>
                    <p>Firebase</p>
                    <p>SQL</p>
                    <p>MongoDB</p>
                </Grid>
            </Grid>
        </div>
    )
}

