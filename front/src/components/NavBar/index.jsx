import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleDrawer } from '../../store/actions/appAction'

import { useStyles } from '../../assets/jss/navbarStyle'

class NavBar extends Component {
    handleDrawerOpen = () => {
        this.props.toggleDrawer()
    }
    render() {
        const { classes, isDrawerOpen } = this.props

        return (
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isDrawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    isDrawerOpen: state.app.isDrawerOpen,
})

export default connect(mapStateToProps, { toggleDrawer })(
    withStyles(useStyles, { withTheme: true })(NavBar)
)
