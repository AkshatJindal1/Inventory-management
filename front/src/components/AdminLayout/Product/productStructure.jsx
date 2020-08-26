import React, { Component } from "react";
import { connect } from "react-redux";

import StructureFormCopy from '../../AddForm/StructureFormCopy'
import { getAllFields } from "../../../store/actions/productAction";
import Loader from '../../Loader'

// import formFields from '../../../demo/formFields'
import datatypes from '../../../demo/datatypes'


export class ProductStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      formFields: []
    };
  }

  isLoading = (formFields) => {
    console.log(formFields)
    this.setState({ loading: false, formFields })
  }

  updateUrl = (formFields) => {
    console.log("Calling API with ", formFields);
  }

  componentWillMount() {
    this.props.getAllFields(this.isLoading);
  }

  render() {
    if (this.state.loading) return (
      <Loader />
    )
    else return (
      <StructureFormCopy formFields={this.state.formFields} datatypes={datatypes} />
    )
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getAllFields,
})(ProductStructure);
