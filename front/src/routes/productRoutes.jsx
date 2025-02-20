import React from 'react'

const Product = React.lazy(() => import('../components/AdminLayout/Product'))
const AddProduct = React.lazy(() =>
    import('../components/AdminLayout/Product/addProduct')
)
const ProductStructure = React.lazy(() =>
    import('../components/AdminLayout/Product/productStructure')
)
const ProductLanding = React.lazy(() =>
    import('../components/AdminLayout/Product/productLanding')
)

const Profile = React.lazy(() => import('../components/authentication/Profile'))

const UserRegistration = React.lazy(() =>
    import('../components/authentication/UserRegistration')
)
const Sale = React.lazy(() => import('../components/AdminLayout/Sales/'))

const ImagePicker = React.lazy(() =>
    import('../components/Controls/ImagePicker')
)

const routes = [
    {
        path: '/trials',
        exact: true,
        name: 'Trials',
        component: ImagePicker,
        private: true,
    },
    {
        path: '/profile',
        exact: true,
        name: 'Profile',
        component: Profile,
        private: true,
    },
    {
        path: '/sale/new',
        exact: true,
        name: 'New Sale',
        component: Sale,
        private: true,
    },
    {
        path: '/data/:options/:formUrl',
        exact: true,
        name: 'Product Index',
        component: Product,
        private: true,
    },
    {
        path: '/form/:option/:formUrl/:itemId',
        exact: true,
        name: 'Update Document',
        component: AddProduct,
        private: true,
    },
    {
        path: '/form/:option/:formUrl',
        exact: true,
        name: 'Add Document',
        component: AddProduct,
        private: true,
    },
    {
        path: '/structure/:option/',
        exact: true,
        name: 'Create New Form',
        component: ProductStructure,
        private: true,
    },
    {
        path: '/structure/:option/:itemUrl',
        exact: true,
        name: 'Update Form',
        component: ProductStructure,
        private: true,
    },
    {
        path: '/tables',
        exact: true,
        name: 'Update Form',
        component: ProductLanding,
        private: true,
    },
]

export default routes
