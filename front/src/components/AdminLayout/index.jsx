import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EmptyContainer from "../Container";
import Navigation from '../Navigation'

// import Navigation from './Navigation';
// import NavBar from './NavBar';
// import Breadcrumb from './Breadcrumb';

// import Loader from "../Loader";

import routes from "../../routes/routes";

// import * as actionTypes from "../../../store/actions";

class AdminLayout extends Component {
  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <EmptyContainer>
        <Navigation />
        {/* <NavBar /> */}
        {/* <Breadcrumb /> */}
        <div className="main-body">
          <Switch>{menu}</Switch>
        </div>
      </EmptyContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(AdminLayout);
