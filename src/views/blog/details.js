import React, { useLayoutEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { Grid } from "@mui/material";
import { convertDateToDisplayFormat } from "../../utils/utils";

const data = {
    id: "B0TLpP15YCeGxsEeshh2",
    date: 1679204728,
    content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ex, feugiat in est ut, sagittis vulputate dui. Vivamus vehicula pharetra consectetur. Aliquam sodales nibh et enim tempor, vitae fringilla purus ornare. Maecenas hendrerit interdum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus libero quam, facilisis nec elit at, rhoncus vulputate ipsum. Nullam viverra elit turpis, id tristique nunc lobortis a. Sed dui nulla, molestie quis nulla nec, convallis lacinia ipsum.",
    view_count: 0,
    tags: ["Travel"],
    title: "30 Days",
    location: "Ha Noi",
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function BlogDetails({ props }) {

    const [content, setContent] = useState(null);

    useLayoutEffect(() => {
        initGrid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initGrid = () => {
        let col_num = 3;
        setContent(numbers.map((i) => {
            return <Grid item xs={12 / col_num}><img
                alt='flower'
                className="blog-img"
                src={process.env.PUBLIC_URL + "/projects/30_days/day " + i + ".jpg"}
            /></Grid>
        }))
    }

    return (
        <m.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            className="custom-wrapper"
            transition={{
                duration: 0.75,
                ease: "easeOut",
            }}>
            <Grid container className="blog-container">
                {content}
            </Grid>
            <div className="blog-details-content">
                <div className="center-positioned">
                    <br />
                    <p className="primary-color s-175rem med">{data.title}</p>
                    <p className="s-175rem med">Date: {convertDateToDisplayFormat(data.date)}</p>
                    <p className="s-175rem med">Category: Backend, Dev, etc.</p>
                    <p className="s-175rem med">Role: Full-stack Engineer</p>
                    <br />
                    <p className="s-175rem med">{data.content}</p>
                </div>
                <div className="item-count">
                    1/2
                </div>
            </div>
        </m.div>
    );
}
