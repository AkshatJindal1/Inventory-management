import React from 'react';

const ProductLanding = React.lazy(() => import('../components/ProductLanding'));

const routes = [
    // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/products', exact: true, name: 'Product Landing', component: ProductLanding }
];

export default routes;