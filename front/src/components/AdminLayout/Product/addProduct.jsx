import React, { Component } from "react";

import AddForm from "../../AddForm/addForm";
import formStructure from '../../../demo/formFields';
import product from '../../../demo/products';

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {},
    };
  }

  render() {

    return (
      <AddForm initialFValues={product} formStructure={formStructure} />
    );
  }
}

export default ProductLanding;
