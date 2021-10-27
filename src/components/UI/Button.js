import React from 'react';
import "./Button.scss"

const Button = (props) => {
    const helper = () => {
        if(props.children === "clear") {
            return "clear";
        } else if (props.children === "search") {
            return "search"
        }
    }
    return (
        <button className={helper()} type="submit">
            {props.children}
        </button>
    )
}

export default Button
