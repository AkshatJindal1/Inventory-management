import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import formFields from '../../../demo/products';
import AddForm from '../../AddForm/addForm'
import EmployeeForm from "../../AddForm/EmployeeForm";

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {},
    };
  }

  render() {



    const initialFValues = {
      id: 0,
      fullName: 'Shagun Bandi',
      email: '',
      mobile: '',
      city: '',
      gender: 'male',
      departmentId: '',
      hireDate: new Date(),
      isPermanent: false,
    }

    return (
      <>
        <AddForm formFields={formFields} />
        <EmployeeForm initialFValues={initialFValues} />
      </>
    );
  }
}

export default ProductLanding;
