import React from "react"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function FloatingActionButton({ props }) {
    return (
        <div className="fab" onClick={() => { props.onClick() }}>
            <Fab aria-label="add">
                {!props.isShowing ? <AddIcon /> : <CloseIcon />}
            </Fab>
        </div>
    )
}