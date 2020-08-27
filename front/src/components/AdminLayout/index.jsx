import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import routes from '../../routes/productRoutes'
import NavBar from '../NavBar'
import Navigation from '../Navigation'

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
        const { classes } = this.props
        const menu = routes.map((route, index) => {
            return route.component ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                />
            ) : null
        })

        return (
            <div className={classes.root}>
                <NavBar />
                <Navigation />
                {/* <Breadcrumb /> */}
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>{menu}</Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(
    mapStateToProps,
    {}
)(withStyles(useStyles, { withTheme: true })(AdminLayout))
