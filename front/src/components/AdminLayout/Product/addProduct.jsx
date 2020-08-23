import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import formFields from '../../../demo/products';
import AddForm from '../../AddForm/addForm'

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {},
    };
  }

  render() {
    return (
      <AddForm formFields={formFields} />
    );
  }
}

export default ProductLanding;
