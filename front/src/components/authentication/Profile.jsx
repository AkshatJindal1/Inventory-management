import React, { Component } from 'react'
import {
    checkApprovedStatus,
    checkUserRegistered,
} from '../../store/actions/profileAction'

import LoginButton from './Login'
import { Redirect } from 'react-router-dom'
import UserRegistration from './UserRegistration'
import { connect } from 'react-redux'
import { withAuth0 } from '@auth0/auth0-react'

export class Profile extends Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null,
            isRegistered: false,
        }
    }

    componentWillMount() {
        const { token } = this.props
        console.log('Inside profile index', token)
        this.props.checkApprovedStatus(token)
        this.isRegistered(token)
    }

    isRegistered = (token) => {
        this.props.checkUserRegistered(token, (isRegistered) => {
            this.setState({
                isRegistered,
            })
        })
    }

    render() {
        const { user, logout, isAuthenticated } = this.props.auth0
        const { isRegistered } = this.state
        return !isRegistered ? (
            <UserRegistration
                token={this.props.token}
                isRegistered={this.isRegistered}
            />
        ) : (
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

const mapStateToProps = () => ({})

export default withAuth0(
    connect(mapStateToProps, { checkUserRegistered, checkApprovedStatus })(
        Profile
    )
)
