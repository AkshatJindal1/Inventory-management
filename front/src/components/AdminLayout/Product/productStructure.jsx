import React, { Component } from "react";
import { connect } from "react-redux";

import StructureForm from '../../AddForm/StructureForm'
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
    // console.log(formFields)
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
      <StructureForm formFields={this.state.formFields} datatypes={datatypes} requestPath={"/forms"} />
    )
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getAllFields,
})(ProductStructure);
