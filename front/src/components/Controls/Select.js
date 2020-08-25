import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    textInput: {
        paddingBottom: "10px",
        margin: "10px 0 0 0",
        position: "relative",
        verticalAlign: "unset"
    }
}))

export default function Select(props) {

    const { name, label, value, error = null, onChange, options } = props;
    const classes = useStyles();

    return (

        <FormControl variant="outlined"
            className={classes.textInput}
            fullWidth="true"
            {...(error && { error: true })}
        // disabled={true}
        // onBlur={(e) => this.validateField(e)}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                onChange={onChange}
                value={value}>
                <MenuItem value=""><em>Select</em></MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </ FormControl >
    )
}
