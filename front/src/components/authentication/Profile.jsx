import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react'
import LoginButton from './Login'

export class Profile extends Component {
    componentWillMount() {}
    render() {
        const { user, logout, isAuthenticated } = this.props.auth0
        console.log(user)
        return (
            <>
                {isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                    </div>
                )}
                <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    Log Out
                </button>
            </>
        )
    }
}

export default withAuth0(Profile)
