import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    textInput: {
        paddingBottom: "10px",
        margin: "10px 0 0 0",
        position: "relative",
        verticalAlign: "center"
    }
}))

export default function RadioGroup(props) {

    const { name, label, value, onChange, items } = props;
    const classes = useStyles();

    return (
        <FormControl
            className={classes.textInput}>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
