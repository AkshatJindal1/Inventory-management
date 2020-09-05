import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Auth0Provider } from '@auth0/auth0-react'

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Auth0Provider
                domain="dev-jl9-q1h7.eu.auth0.com"
                clientId="KHcF57aMNgLRej7GaA9R8I6mmR6pOydR"
                redirectUri={window.location.origin}
                audience="https://dev-jl9-q1h7.eu.auth0.com/api/v2/"
                scope="read:current_user update:current_user_metadata"
            >
                <App />
            </Auth0Provider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
