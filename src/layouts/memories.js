import React from "react";
// import useFetch from "../hooks/useFetch";
import { host_url } from "../utils/utils";
import Grid from '@mui/material/Grid';
import FloatingActionButton from "../components/buttons/floatingActionButton";
import useModal from "../hooks/useModal";
import Modal from "../components/modals/modal";
import ImageForm from "../components/form/imageForm";
import { motion as m } from 'framer-motion'
import ScrollWrapper from "../components/wrappers/scrollWrapper";

export default function Memories() {
    const { isShowing, toggle } = useModal();
    //const { data, error, isLoaded } = useFetch(host_url + "/image");

    const showForm = () => {
        console.log('Clicked');
        toggle();
    }

    const data = [
        { name: "DSC_0694.jpg", id: "3Y5469EzyslVhGUIITI6" },
        { name: "DSC_0614.jpg", id: "5hrTNEfX3Cpl4RIIrxr9" },
        { name: "DSC_0674.jpg", id: "9TIrW5pqtfC9cIKcG5fu" },
        { name: "DSC_0642.jpg", id: "ANnNgHEr7XJh8persKCy" },
        { name: "DSC_0662.jpg", id: "PwGLWPa4pgnw1rPS0i1t" },
        { name: "DSC_0458.jpg", id: "SSRFGiddYEQKjXtvLcJG" },
        { name: "DSC_0670.jpg", id: "SeteUHhdR8xQCoq7wCOX" },
        { name: "DSC_0628.jpg", id: "UsB7Lfshe03R79iMtKKm" },
        { name: "DSC_0627.jpg", id: "kRpZQW8Kh8mUqVk9zNuK" },
        { name: "DSC_0655.jpg", id: "klEXgZPBhOR6FTWvBSpo" }
    ];

    const getImages = () => {
        let items = [];

        for (let i = 0; i < data.length; i += 3) {
            let row = [];
            for (let j = 0; j < 3 && i + j < data.length; j++) {
                row.push(
                    <Grid key={`item-${i}-${j}`} item xs={4}>
                        <div className='grid-elements memories-card' style={{ backgroundImage: `url(${host_url + "/images/" + data[i + j].name})` }}>
                        </div>
                    </Grid>
                )
            }
            items.push(
                <Grid key={`item-${i}`} container item spacing={3}>
                    {row}
                </Grid >
            )
        }

        return items;
    };

    return (
        <ScrollWrapper>
            <m.div

                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{
                    duration: 0.75,
                    ease: 'easeOut'
                }}>
                <div className="custom-container mt-70">
                    <div className="custom-wrapper h-30 t-center">
                        <div className="center-div w-40">
                            <div className="custom-row">
                                <h1 className="display-font s-48 primary-color ml-5">
                                    my memories{" "}
                                </h1>
                                <span className="display-font s-24 primary-color ml-5">
                                    ({data.length})
                                </span>
                            </div>
                            <br />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pellentesque massa risus, vitae dictum sem
                                condimentum eu. Maecenas eu arcu ut elit feugiat
                                lobortis at id libero. Vestibulum tempus eros ac diam
                                ullamcorper elementum. Vestibulum ut euismod tortor.
                                Donec dui velit, tempus ac magna at, aliquam laoreet
                                sapien.
                            </p>
                        </div>
                    </div>
                    <div className="memories-image-container" >
                        <Grid item xs={12} md={6}>
                            {getImages()}
                        </Grid>
                    </div>
                </div>
            </m.div>
        </ScrollWrapper>
    );
}
