import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react'
import LoginButton from './Login'

export class ProductLanding extends Component {
    componentWillMount() {
        let accessToken = ''
        const domain = 'https://dev-jl9-q1h7.eu.auth0.com/api/v2/'
        const another = 'https://quickstarts/api'
        this.props.auth0
            .getAccessTokenSilently({
                audience: domain,
                // scope: 'read:posts',
            })
            .then((token) => {
                let userDetailsByIdUrl = `${domain}/users/${this.props.auth0.user.sub}`
                console.log('Token>>\n', token)
                fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => console.log('>>>', res))
            })
            .catch((res) => console.log('<><><>', res))
    }

    render() {
        const {
            loginWithRedirect,
            user,
            logout,
            isAuthenticated,
            getAccessTokenSilently,
        } = this.props.auth0
        console.log(user)
        return (
            <>
                {isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <h3>User Metadata</h3>
                    </div>
                )}
                <LoginButton />
                <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    Log Out
                </button>
            </>
        )
    }
}

export default withAuth0(ProductLanding)
