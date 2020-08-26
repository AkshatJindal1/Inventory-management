import React, { Component } from "react";
import { connect } from "react-redux";

import AddForm from "../../AddForm/addForm";
import product from '../../../demo/products';
import { getAllFields } from "../../../store/actions/productAction";
import Loader from '../../Loader'
import formStructure from '../../../demo/formFields';

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      formFields: []
    };
  }

  isLoading = (formFields) => {
    console.log(formFields)
    // console.log(formStructure)
    this.setState({ loading: false, formFields })
  }

  updateUrl = (formFields) => {
    console.log("Calling API with ", formFields);
  }

  componentWillMount() {
    this.props.getAllFields(this.isLoading);
  }

  render() {
    if (this.state.loading) return <Loader />;
    else return <AddForm initialFValues={product} formStructure={this.state.formFields} />;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getAllFields,
})(ProductLanding);