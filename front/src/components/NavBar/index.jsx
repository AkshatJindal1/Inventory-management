import React, { Component } from "react";
import { connect } from "react-redux";
import MiniDrawer from './AppBar'

export class NavBar extends Component {
  render() {
    return (
      <MiniDrawer/>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.allProducts,
});

export default connect(mapStateToProps, {})(NavBar);
