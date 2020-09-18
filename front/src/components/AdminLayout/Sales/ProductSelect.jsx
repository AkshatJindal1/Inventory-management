// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import axios from 'axios'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { BASE_URL } from '../../../store/actions/constants'

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
    const [value, setValue] = React.useState('')
    const loading = open && options.length === 0

    React.useEffect(() => {
        let active = true

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
        }

        const data = {
            recordsPerPage: 5,
            searchText: value,
        }

        const url = `${BASE_URL}/products/t-shirts-5`

        ;(async () => {
            const response = await axios.post(
                `${BASE_URL}/products/t-shirts-5`,
                data,
                {
                    headers: headers,
                }
            )

            const countries = await response.data.response

            if (active && countries.length !== 0) {
                setOptions(countries)
            }
        })()

        return () => {
            active = false
        }
    }, [loading, value])

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
                if (option.productId === value.productId) {
                    if (option.productId != props.value)
                        props.optionSelected(option)
                    return true
                }
                return false
            }}
            getOptionLabel={(option) =>
                `${option.productId} - ${option.productName}`
            }
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    variant="outlined"
                    onChange={(e) => setValue(e.target.value)}
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
