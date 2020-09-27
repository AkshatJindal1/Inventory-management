import React, { Component } from 'react'

import Loader from '../Loader'
import Profile from './Profile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import routes from '../../routes/productRoutes'
import { withAuth0 } from '@auth0/auth0-react'

export class PrivateRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isError: false,
            redirectTo: null,
        }
    }

    componentWillMount() {
        if (!this.props.userApprovedStatus) {
            console.log('User approved')
            this.setState({
                redirectTo: <Redirect to={'/profile'} />,
            })
        }
    }

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
            isLoading,
        } = this.props.auth0
        const { userApprovedStatus } = this.props
        console.log('In private route', route)

        const redirect_uri = `${window.location.origin}${this.props.match.url}`
        if (isLoading) return <Loader text="Fetching the details for you" />
        if (!isAuthenticated) {
            return loginWithRedirect()
        }
        if (this.state.isLoading) {
            this.getToken()
            return <Loader text="Fetching the details for you" />
        }
        if (this.state.isError) return 'Something Went Wrong'
        return (
            <>
                {this.state.redirectTo}
                <route.component token={this.state.token} {...this.props} />
            </>
        )
    }
}

const mapStateToProps = ({ profile: { userApprovedStatus } }) => ({
    userApprovedStatus,
})

export default connect(mapStateToProps, {})(withAuth0(PrivateRoute))
