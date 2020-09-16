import React, { Component } from 'react'

import Loader from '../Loader'
import LoginButton from './Login'
import { Redirect } from 'react-router-dom'
import { withAuth0 } from '@auth0/auth0-react'

export class PrivateRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
        }
    }

    componentWillMount() {}

    getToken = () => {
        const domain = 'https://dev-jl9-q1h7.eu.auth0.com/api/v2/'
        this.props.auth0
            .getAccessTokenSilently({
                audience: domain,
            })
            .then((token) => {
                this.setState({ token, isLoading: false, isError: false })
            })
            .catch(() => this.setState({ isLoading: false, isError: true }))
    }

    render() {
        const { route } = this.props
        const {
            user,
            isAuthenticated,
            loginWithRedirect,
            handleRedirectCallback,
        } = this.props.auth0
        const redirect_uri = `${window.location.origin}${this.props.match.url}`

        console.log(redirect_uri)
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            return loginWithRedirect()
        }

        if (this.state.isLoading) {
            this.getToken()
            return <Loader />
        }
        if (this.state.isError) return 'Something Went Wrong'
        return <route.component token={this.state.token} {...this.props} />
    }
}

export default withAuth0(PrivateRoute)
