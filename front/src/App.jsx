import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable'
import Loader from './components/Loader'
import PrivateRoute from './components/authentication/PrivateRoute'
import { connect } from 'react-redux'
import routes from './routes/route'

const AdminLayout = Loadable({
    loader: () => import('./components/AdminLayout'),
    loading: Loader,
})

class App extends Component {
    handleNotificationClose = () => {
        const notification = {
            open: false,
            message: '',
            severity: '',
        }
    }

    render() {
        const menu = routes.map((route, index) => {
            return (
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
            )
        })

        return (
            <Suspense fallback={<Loader />}>
                <Switch>
                    {menu}
                    <Route path="/" component={AdminLayout} />
                </Switch>
            </Suspense>
        )
    }
}

export default App
