import React, { Component } from "react";

import formFields from '../../../demo/products';
import AddForm from '../../AddForm/addForm'
import EmployeeForm from "../../AddForm/EmployeeForm";
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
      <>
        {/* <AddForm formFields={formFields} /> */}
        <EmployeeForm initialFValues={productSample} formStructure={formStructure} />
      </>
    );
  }
}

export default ProductLanding;
