import './index.css'

import * as serviceWorker from './serviceWorker'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/store'
import { Auth0Provider } from '@auth0/auth0-react'

const app = (
    <Auth0Provider
        domain="dev-jl9-q1h7.eu.auth0.com"
        clientId="0JG66AY7GZaBQW7lsmkATkKjm64ZEZJ8"
        redirectUri={window.location.origin}
        audience="https://dev-jl9-q1h7.eu.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
        useRefreshTokens={true}
    >
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </Auth0Provider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
