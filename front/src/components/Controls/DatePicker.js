import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

import DateFnsUtils from 'date-fns'
import React from 'react'

export default function DatePicker(props) {
    const { name, label, value, onChange, ...other } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value,
        },
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={(date) => onChange(convertToDefEventPara(name, date))}
                {...other}
            />
        </MuiPickersUtilsProvider>
    )
}
