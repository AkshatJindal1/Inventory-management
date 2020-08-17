import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllProducts
} from '../actions/productAction';

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
  return <td key={props.data[key]}>{props.data[key]}</td>
  })
 }

export class ProductLanding extends Component {

  componentDidMount() {
    this.props.getAllProducts()
    console.log(this.props.products)
  }

  getKeys = () => {
    return Object.keys(this.props.product[0])
  }

  getHeader = () => {
    const keys = this.getKeys()
    return keys.map((key, index) => {
      return <th key = {key}>{key.toUpperCase()}</th>
    })
  }

  getRowsData = () => {
    const items = this.props.product
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
    const { products} = this.props;
    return (
      <Component>
        {this.renderTable()}
      </Component>
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
