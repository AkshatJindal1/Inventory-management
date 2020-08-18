import React, { Component } from "react";
import { connect } from "react-redux";
import MiniDrawer from './Drawer'

export class Navigation extends Component {
  render() {
    return (
      <MiniDrawer/>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.allProducts,
});

export default connect(mapStateToProps, {})(Navigation);
