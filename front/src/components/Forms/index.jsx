import React from 'react'

export function Form(props) {

    const { children, ...other } = props;
    return (
        <form autoComplete="on" {...other}>
            {props.children}
        </form >
    )
}

