import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from './AppBar'

export class NavBar extends Component {
  render() {
    return <AppBar />;
  }
}

const mapStateToProps = (state) => ({
  products: state.product.allProducts,
});

export default connect(mapStateToProps, {})(NavBar);
