import React, { Component } from "react";
import { connect } from "react-redux";

export class Navigation extends Component {
  render() {
    return (
      <div>Navigation Logic</div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.allProducts,
});

export default connect(mapStateToProps, {})(Navigation);
