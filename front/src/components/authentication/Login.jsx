import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = (props) => {
    const { loginWithRedirect } = useAuth0()
    console.log(props)

    return <button onClick={() => loginWithRedirect()}>Log In</button>
}

export default LoginButton
