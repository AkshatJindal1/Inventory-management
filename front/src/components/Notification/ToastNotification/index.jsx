import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function ToastNotification(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const horizontal = 'right'
    const vertical = 'top'
    const transition = <Slide direction="left" />
    const { severity, message } = props

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                    TransitionComponent={transition}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
