import React from 'react'
import {
    FormControl,
    FormControlLabel,
    Checkbox as MuiCheckbox,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    textInput: {
        paddingBottom: '10px',
        margin: '10px 0 0 0',
        position: 'relative',
        verticalAlign: 'unset',
    },
}))

export default function Checkbox(props) {
    const { name, label, value, onChange, ...other } = props
    const classes = useStyles()

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    })

    return (
        <FormControl className={classes.textInput}>
            <FormControlLabel
                control={
                    <MuiCheckbox
                        name={name}
                        color="primary"
                        checked={value}
                        onChange={(e) =>
                            onChange(
                                convertToDefEventPara(name, e.target.checked)
                            )
                        }
                        {...other}
                    />
                }
                label={label}
            />
        </FormControl>
    )
}
