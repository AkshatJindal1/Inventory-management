// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

const useStyles = makeStyles((theme) => ({
    textInput: {
        paddingBottom: '10px',
        margin: '10px 0 0 0',
        position: 'relative',
        verticalAlign: 'unset',
    },
}))

export default function Asynchronous(props) {
    const [open, setOpen] = React.useState(false)
    const [options, setOptions] = React.useState([])
    const loading = open && options.length === 0

    React.useEffect(() => {
        let active = true

        if (!loading) {
            return undefined
        }

        ;(async () => {
            const response = await fetch(
                'https://country.register.gov.uk/records.json?page-size=5000'
            )
            // await sleep(1e3) // For demo purposes.
            const countries = await response.json()

            if (active) {
                setOptions(
                    Object.keys(countries).map((key) => countries[key].item[0])
                )
            }
        })()

        return () => {
            active = false
        }
    }, [loading])

    React.useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    const classes = useStyles()

    return (
        <Autocomplete
            id={props.id}
            className={classes.textInput}
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            getOptionSelected={(option, value) => {
                if (option.name === value.name) {
                    if (option.country != props.value)
                        props.optionSelected(option)
                    return true
                }
                return false
            }}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
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
