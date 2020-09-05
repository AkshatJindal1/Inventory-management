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

const routes = [
    {
        path: '/products/:formUrl',
        exact: true,
        name: 'Product Index',
        component: Product,
    },
    {
        path: '/form/:option/:formUrl/:itemId',
        exact: true,
        name: 'Update Document',
        component: AddProduct,
    },
    {
        path: '/form/:option/:formUrl',
        exact: true,
        name: 'Add Document',
        component: AddProduct,
    },
    {
        path: '/structure/:option/',
        exact: true,
        name: 'Create New Form',
        component: ProductStructure,
    },
    {
        path: '/structure/:option/:itemUrl',
        exact: true,
        name: 'Update Form',
        component: ProductStructure,
    },
    {
        path: '/tables',
        exact: true,
        name: 'Update Form',
        component: ProductLanding,
    },
]

export default routes
