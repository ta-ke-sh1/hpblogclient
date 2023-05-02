import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion as m } from "framer-motion";
import { Grid } from "@mui/material";
import { convertDateToDisplayFormat } from "../../utils/utils";

const data = {
    id: "B0TLpP15YCeGxsEeshh2",
    image: ["image1.jpg"],
    date: 1679204728,
    content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ex, feugiat in est ut, sagittis vulputate dui. Vivamus vehicula pharetra consectetur. Aliquam sodales nibh et enim tempor, vitae fringilla purus ornare. Maecenas hendrerit interdum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus libero quam, facilisis nec elit at, rhoncus vulputate ipsum. Nullam viverra elit turpis, id tristique nunc lobortis a. Sed dui nulla, molestie quis nulla nec, convallis lacinia ipsum. Morbi nec tempor felis. Donec pulvinar orci urna, ac semper dui bibendum congue. Suspendisse hendrerit pulvinar tellus vel euismod.\nIn varius lacinia ante non mattis.Mauris ut turpis turpis.Vivamus id lectus a libero lobortis sodales.Nam sit amet ligula lacus.Curabitur fringilla elit non tellus porta, in dapibus elit tincidunt.Praesent a enim sed felis sodales luctus facilisis mollis nunc.Maecenas euismod sodales tristique.\nSed pretium libero sit amet nibh mattis auctor.In massa diam, fermentum vel varius eu, efficitur ut orci.Sed nec ex id magna tempor finibus a quis augue.Sed auctor, velit a ornare consequat, nibh justo varius quam, eu vestibulum justo nisi nec sapien.Aliquam eget accumsan lacus.Aenean rhoncus leo non rhoncus tristique.Sed ex elit, suscipit consequat gravida non, varius ac lacus.Phasellus ultrices nisl ut lacus sollicitudin, vel mattis arcu congue.Donec neque enim, tempus dictum rhoncus eu, consequat eget mauris.Cras sodales nisi nec augue feugiat, nec feugiat ipsum posuere.Maecenas mattis malesuada congue.Integer eget sapien sed diam varius vulputate quis nec ante.Nunc nibh ex, imperdiet vitae turpis eu, mattis vestibulum lacus.In sollicitudin hendrerit metus, at tristique quam fermentum sed.\nNulla pretium, tortor ut ornare iaculis, mauris lorem placerat lectus, ut ultrices risus mauris in urna.Sed pharetra ullamcorper massa, ut euismod lacus rhoncus ac.Maecenas porttitor viverra pulvinar.Donec sit amet urna id nibh suscipit cursus.Proin sit amet libero vitae libero vehicula fermentum.Aliquam hendrerit nisl fermentum, dictum dui at, feugiat purus.Nam condimentum nibh id luctus eleifend.Praesent pellentesque, arcu quis lobortis faucibus, nulla enim ultricies tellus, suscipit gravida leo mauris ut nisl.Duis sed consequat quam.Praesent tristique consectetur ipsum a aliquam.Aliquam rhoncus tincidunt pharetra.Cras vel tellus justo.Curabitur lacus felis, iaculis et lacus vitae, commodo lobortis nulla.Praesent iaculis erat id ultrices ullamcorper.Sed fermentum, velit sed pretium consectetur, erat nisl suscipit tellus, eget congue est felis finibus orci.Aliquam erat volutpat.\nPhasellus porta odio tortor, vel convallis felis commodo a.Morbi a purus eros.Morbi interdum eget mauris vel faucibus.Donec sed enim eleifend, molestie risus laoreet, fringilla ipsum.In hac habitasse platea dictumst.Donec quis consectetur nunc.In eu purus dictum nisi porttitor eleifend sit amet at elit.Donec fermentum semper sem, in dictum mauris laoreet faucibus.Integer non tortor risus.",
    view_count: 0,
    tags: ["Travel"],
    title: "How To Write A Blog",
    location: "Ha Noi",
};

export default function BlogDetails({ props }) {
    const { id } = useParams();

    const [content, setContent] = useState([]);

    useLayoutEffect(() => {
        console.log(id);
        setContent(data.content.split("\n"));
    }, [id]);

    return (
        <m.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
                duration: 0.75,
                ease: "easeOut",
            }}>
            <div className="custom-container mt-70">
                <Grid container spacing={4} className="blog-container">
                    <Grid item xs={12} md={6}>
                        <div className="blog-item text">
                            <img
                                alt='flower'
                                className="blog-img"
                                src="https://images.pexels.com/photos/10551237/pexels-photo-10551237.jpeg"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="blog-item text">
                            <div className="center-positioned">
                                <h1 className="display-font primary-color s-64">{data.title}</h1>
                                <p>{convertDateToDisplayFormat(data.date)}</p>
                                <p>{content[0]}</p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </m.div>
    );
}
