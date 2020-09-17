import React, { Component } from 'react'

import LoginButton from './Login'
import { Redirect } from 'react-router-dom'
import { checkUserRegistered } from '../../store/actions/profileAction'
import { connect } from 'react-redux'
import { withAuth0 } from '@auth0/auth0-react'

export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null,
        }
    }

    componentWillMount() {
        const { token } = this.props
        this.props.checkUserRegistered(token, (redirectTo) => {
            if (redirectTo !== null) {
                this.setState({
                    redirectTo: <Redirect to={`/${redirectTo}`} />,
                })
            }
        })
    }
    render() {
        const { user, logout, isAuthenticated } = this.props.auth0
        return (
            <>
                {this.state.redirectTo}
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

const mapStateToProps = () => ({})

export default withAuth0(
    connect(mapStateToProps, { checkUserRegistered })(Profile)
)
