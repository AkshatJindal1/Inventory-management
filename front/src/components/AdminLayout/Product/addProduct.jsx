import React, { Component } from "react";

import AddForm from "../../AddForm/addForm";
import Loader from '../../Loader'
import { connect } from "react-redux";
import formStructure from '../../../demo/formFields';
import { getAllFields } from "../../../store/actions/productAction";
import product from '../../../demo/products';

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
