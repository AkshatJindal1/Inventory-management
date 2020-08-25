import React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    textInput: {
        paddingBottom: "10px",
        margin: "10px 0 0 0",
        position: "relative",
        verticalAlign: "unset"
    }
}))

export default function Input(props) {

    const classes = useStyles();
    const { name, label, value, error = null, onChange } = props;
    return (
        <TextField
            className={classes.textInput}
            variant="outlined"
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
        />
    )
}
