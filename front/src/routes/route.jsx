import React from 'react'

const Main = React.lazy(() => import('../components/authentication/index'))
// const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const route = [
    {
        path: '/auth/main',
        exact: true,
        name: 'Signup 1',
        component: Main,
        private: false,
    },
    // { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 }
]

export default route
