import {
    IconButton,
    Theme,
    Typography,
    WithStyles,
    createStyles,
    withStyles,
} from '@material-ui/core'
import React, { Component } from 'react'

import { combine } from '../utils'

const useStyles = (theme) =>
    createStyles({
        leftBorderRadius: {
            borderRadius: '50% 0 0 50%',
        },
        rightBorderRadius: {
            borderRadius: '0 50% 50% 0',
        },
        buttonContainer: {
            display: 'flex',
        },
        button: {
            height: 36,
            width: 36,
            padding: 0,
        },
        buttonText: {
            lineHeight: 1.6,
        },
        outlined: {
            border: `1px solid ${theme.palette.primary.dark}`,
        },
        filled: {
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
            backgroundColor: theme.palette.primary.dark,
        },
        highlighted: {
            backgroundColor: theme.palette.action.hover,
        },
        contrast: {
            color: theme.palette.primary.contrastText,
        },
    })

class Day extends Component {
    render() {
        const { classes } = this.props
        return (
            <div
                className={combine(
                    classes.buttonContainer,
                    this.props.startOfRange && classes.leftBorderRadius,
                    this.props.endOfRange && classes.rightBorderRadius,
                    !this.props.disabled &&
                        this.props.highlighted &&
                        classes.highlighted
                )}
            >
                <IconButton
                    className={combine(
                        classes.button,
                        !this.props.disabled &&
                            this.props.outlined &&
                            classes.outlined,
                        !this.props.disabled &&
                            this.props.filled &&
                            classes.filled
                    )}
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}
                    onMouseOver={this.props.onHover}
                >
                    <Typography
                        color={
                            !this.props.disabled ? 'default' : 'textSecondary'
                        }
                        className={combine(
                            classes.buttonText,
                            !this.props.disabled &&
                                this.props.filled &&
                                classes.contrast
                        )}
                        variant="body2"
                    >
                        {this.props.value}
                    </Typography>
                </IconButton>
            </div>
        )
    }
}

export default withStyles(useStyles)(Day)
