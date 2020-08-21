import React from 'react';

const Product = React.lazy(() => import('../components/AdminLayout/Product'));
const AddProduct = React.lazy(() => import('../components/AdminLayout/Product/addProduct'));
const AddProductFunction = React.lazy(() => import('../components/AdminLayout/Product/funcitonInput'));

const routes = [
    // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/products', exact: true, name: 'Product Index', component: Product },
    { path: '/add-product', exact: true, name: 'Add Product', component: AddProduct }
];

export default routes;