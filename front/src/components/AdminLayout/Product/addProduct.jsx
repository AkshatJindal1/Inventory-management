import React, { Component } from "react";

import EmployeeForm from "../../AddForm/AddForm";
import formStructure from '../../../demo/formFields';
import productSample from '../../../demo/productsSample';

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {},
    };
  }

  render() {

    return (
      <EmployeeForm initialFValues={productSample} formStructure={formStructure} />
    );
  }
}

export default ProductLanding;
