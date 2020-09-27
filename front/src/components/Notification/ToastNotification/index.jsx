import React, { Component } from 'react'

import MuiAlert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import { render } from '@testing-library/react'

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

class ToastNotification extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
        }
    }

    componentWillMount() {
        this.setState({ open: true })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        this.setState({ open: false })
    }

    render() {
        const transition = <Slide direction="left" />
        const { severity, message, open } = this.props
        const vertical = 'bottom'
        const horizontal = 'left'
        return (
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <Alert
                        onClose={this.props.handleNotificationClose}
                        severity={severity}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        key={vertical + horizontal}
                        TransitionComponent={transition}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default ToastNotification
