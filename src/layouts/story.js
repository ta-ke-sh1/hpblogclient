import React from "react";
import FloatingActionButton from "../components/floatingActionButton";
import useModal from "../hooks/useModal";
import Modal from "../components/modals/modal";
import ImageForm from "../components/form/imageForm";

export default function Story() {
    const { isShowing, toggle } = useModal();
    //const { data, error, isLoaded } = useFetch(host_url + "/image");

    const showForm = () => {
        console.log('Clicked');
        toggle();
    }

    return (
        <div className="custom-container mt-70">
            <div className="custom-wrapper h-30 t-center">
                <div className="center-div w-40">
                    <div className="custom-row">
                        <h1 className="display-font s-48 primary-color ml-5">
                            my story
                        </h1>
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
            <FloatingActionButton props={{ size: '100px', bg_color: '#f53c62', onClick: showForm, isShowing: isShowing }} />
            <Modal isShowing={isShowing} hide={toggle}>
                <ImageForm />
            </Modal>
        </div>
    );
}