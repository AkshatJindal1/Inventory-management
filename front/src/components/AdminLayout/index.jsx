import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";

import EmptyContainer from "../Container";
import Navigation from "../Navigation";
import NavBar from "../NavBar";

// import Navigation from './Navigation';
// import NavBar from './NavBar';
// import Breadcrumb from './Breadcrumb';

// import Loader from "../Loader";

import routes from "../../routes/routes";

// import * as actionTypes from "../../../store/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

class AdminLayout extends Component {
  render() {
    const { classes } = this.props;
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
      <div className={classes.root}>
        <Navigation />
        <NavBar />
        {/* <Breadcrumb /> */}
        <div className="main-body">
          <Switch>{menu}</Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  {}
)(withStyles(useStyles, { withTheme: true })(AdminLayout));
