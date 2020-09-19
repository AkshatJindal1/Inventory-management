import axios from 'axios'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { BASE_URL } from '../../../store/actions/constants'

const useStyles = makeStyles((theme) => ({
    textInput: {
        paddingBottom: '10px',
        margin: '10px 0 0 0',
        position: 'relative',
        verticalAlign: 'unset',
    },
}))

export default function ControllableStates(props) {
    const [value, setValue] = React.useState()
    const [inputValue, setInputValue] = React.useState('')
    const [options, setOptions] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!(value == props.value)) setValue(props.value)
    }, [props.value])

    React.useEffect(() => {
        if (!(value == props.value)) props.optionSelected(value)
        if (value != null) setInputValue(value.productLabel)
        if (value == null) setInputValue('')
    }, [value])

    React.useEffect(() => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
        }

        const url = `${BASE_URL}/products/sales/?searchText=${inputValue}`

        ;(async () => {
            const response = await axios.get(url, {
                headers: headers,
            })
            const countries = await response.data
            setOptions(countries)
            setLoading(false)
        })()
    }, [inputValue])

    const classes = useStyles()

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            className={classes.textInput}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            getOptionLabel={(option) => option.productLabel}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Controllable"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}
