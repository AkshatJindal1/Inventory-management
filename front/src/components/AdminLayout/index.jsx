import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from '../NavBar'
import Navigation from '../Navigation'
import PrivateRoute from '../authentication/PrivateRoute'
import ToastNotification from '../Notification/ToastNotification'
import { closeNotification } from '../../store/actions/notificationAction'
import { connect } from 'react-redux'
import routes from '../../routes/productRoutes'
import { withStyles } from '@material-ui/core/styles'

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
})

class AdminLayout extends Component {
    render() {
        const { notification } = this.props
        const { classes } = this.props
        const menu = routes.map((route, index) => {
            return route.component ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) =>
                        route.private ? (
                            <PrivateRoute route={route} {...props} />
                        ) : (
                            <route.component {...props} />
                        )
                    }
                />
            ) : null
        })

        return (
            <div className={classes.root}>
                <ToastNotification
                    open={notification.open}
                    severity={notification.severity}
                    message={notification.message}
                    handleNotificationClose={this.props.closeNotification}
                />
                <NavBar />
                <Navigation />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>{menu}</Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = ({ notification }) => ({ notification })

export default connect(mapStateToProps, { closeNotification })(
    withStyles(useStyles, { withTheme: true })(AdminLayout)
)
