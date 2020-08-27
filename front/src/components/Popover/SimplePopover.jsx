import { Box, Button, DialogActions, DialogContent } from '@material-ui/core'
import React, { Component } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'

const useStyles = (theme) => ({
    paper: {
        minWidth: '1000px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '0px',
        },
    },
})

class SimplePopover extends Component {
    handleClose = () => {
        this.props.togglePopover(false)
    }
    render() {
        const {
            isPopoverOpen,
            renderComponent,
            popupTitle,
            classes,
            theme,
            width,
        } = this.props
        console.log(this.props)
        const fullScreen = /xs|sm/.test(width)
        console.log(fullScreen)
        return (
            <div>
                <Dialog
                    classes={{ paper: classes.paper }}
                    fullScreen={fullScreen}
                    open={isPopoverOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {popupTitle}
                    </DialogTitle>
                    <DialogContent>{renderComponent}</DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={this.props.handleFilterCancel}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.props.handleFilterSubmit}
                            color="primary"
                            autoFocus
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withWidth()(
    withStyles(useStyles, { withTheme: true })(SimplePopover)
)
