import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllProducts
} from '../actions/productAction';


export class ProductLanding extends Component {

  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const { products} = this.props;
    return (
      <div className="bg-greyish">
        {products}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.allProducts
});

export default connect(
  mapStateToProps,
  {
    getAllProducts
  }
)(ProductLanding);
