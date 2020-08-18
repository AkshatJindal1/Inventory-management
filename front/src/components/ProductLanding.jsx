import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getAllProducts
} from '../store/actions/productAction';

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
  return <td key={props.data[key]}>{props.data[key]}</td>
  })
 }

export class ProductLanding extends Component {

  componentWillMount() {
    this.props.getAllProducts()
  }

  getKeys = () => {
    return Object.keys(this.props.products[0])
  }

  getHeader = () => {
    const keys = this.getKeys()
    return keys.map((key, index) => {
      return <th key = {key}>{key.toUpperCase()}</th>
    })
  }

  getRowsData = () => {
    const items = this.props.products
    const keys = this.getKeys()
    return items.map((row, index) => {
      return <tr key = {index}>
        <RenderRow key = {index} data = {row} keys = {keys} /> 
      </tr>
    })
  }

  renderTable = () => {
    return (
      <Component>
          <table>
            <thead>
              <tr>
                {this.getHeader()}
              </tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
          </table>
      </Component>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderTable}
      </Fragment>
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
