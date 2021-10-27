import React from 'react'
import "./ShowErrorMessage.scss"
import ErrorIcon from '@mui/icons-material/Error';
import { red } from "@mui/material/colors";

const ShowErrorMessage = ({message}) => {
    return (
        <div className="wrapper-msg">
            <div className="icon-msg"> 
            <ErrorIcon sx={{ color: red[200],fontSize: 30,  }}  ></ErrorIcon>
            </div>
            <div className="msg">{message}</div>
        </div>
    )
}

export default ShowErrorMessage
