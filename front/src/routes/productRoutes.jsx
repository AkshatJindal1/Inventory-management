import React from 'react';

const Product = React.lazy(() => import('../components/AdminLayout/Product'));
const AddProduct = React.lazy(() => import('../components/AdminLayout/Product/addProduct'));
const ProductStructure = React.lazy(() => import('../components/AdminLayout/Product/productStructure'));

const routes = [
    { path: '/products', exact: true, name: 'Product Index', component: Product },
    { path: '/add-product', exact: true, name: 'Add Product', component: AddProduct },
    { path: '/product-structure', exact: true, name: 'Add Product', component: ProductStructure }
];

export default routes;