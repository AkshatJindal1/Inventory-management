import React from 'react';

const Product = React.lazy(() => import('../components/AdminLayout/Product'));

const routes = [
    // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/products', exact: true, name: 'Product Index', component: Product }
];

export default routes;