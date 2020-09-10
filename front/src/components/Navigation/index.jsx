import React, { Component, Fragment } from 'react'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { toggleDrawer } from '../../store/actions/appAction'
import { useStyles } from '../../assets/jss/navigationStyle'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'

class Navigation extends Component {
    handleDrawerClose = () => {
        this.props.toggleDrawer()
    }

    responsiveDrawer = () => {
        const { width } = this.props
        // console.log(this.props)
        const isSmallScreen = /xs/.test(width)
        var drawerProps = {
            variant: isSmallScreen ? 'tempporary' : 'permanent',
        }
        if (isSmallScreen)
            drawerProps = {
                open: this.props.isDrawerOpen,
                onClose: this.handleDrawerClose,
                ...drawerProps,
            }
        return drawerProps
    }

    getBrand = () => {
        const { logoText } = this.props

        const brand = (
            <List>
                <ListItem>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={logoText} />
                </ListItem>
            </List>
        )
        return brand
    }

    render() {
        const { classes, isDrawerOpen } = this.props
        return (
            <Fragment>
                <Drawer
                    {...this.responsiveDrawer()}
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: isDrawerOpen,
                        [classes.drawerClose]: !isDrawerOpen,
                    })}
                    classes={{
                        paper: clsx(classes.drawer, {
                            [classes.drawerOpen]: isDrawerOpen,
                            [classes.drawerClose]: !isDrawerOpen,
                        }),
                    }}
                >
                    {this.getBrand()}
                    <Divider />
                    <NavLink
                        to="/tables/"
                        activeClassName="active"
                        key="tables"
                    >
                        <List>
                            <ListItem button key="tables">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tables" />
                            </ListItem>
                        </List>
                    </NavLink>

                    <NavLink
                        to="/products"
                        activeClassName="active"
                        key="products"
                    >
                        <List>
                            <ListItem button key="products">
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="products" />
                            </ListItem>
                        </List>
                    </NavLink>

                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                            (text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        )}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isDrawerOpen: state.app.isDrawerOpen,
    logoText: state.app.companyName,
})

export default connect(mapStateToProps, { toggleDrawer })(
    withWidth()(withStyles(useStyles, { withTheme: true })(Navigation))
)
