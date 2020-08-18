import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from './components/Loader'

import routes from './routes/route';

const AdminLayout = Loadable({
  loader: () => import("./components/AdminLayout"),
  loading: Loader,
});

class App extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return (route.component) ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => (
            <route.component {...props} />
          )} />
      ) : (null);
    });

    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Route path="/" component={AdminLayout} />
        </Switch>
      </Suspense>
    );
  }
}

export default App;
