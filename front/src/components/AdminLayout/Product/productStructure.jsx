import React, { Component } from "react";
import { connect } from "react-redux";

import StructureForm from '../../AddForm/structureForm'
import { getAllFields } from "../../../store/actions/productAction";
import Loader from '../../Loader'


export class ProductStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      formFields: []
    };
  }

  isLoading = (formFields) => {
    this.setState({ loading: false, formFields })
  }

  updateUrl = (formFields) => {
    console.log("Calling API with ", formFields);
  }

  componentWillMount() {
    this.props.getAllFields(this.isLoading);
  }

  render() {
    console.log(this.state)
    if (this.state.loading) return <Loader />
    else return < StructureForm formFields={this.state.formFields} updateUrl={this.updateUrl} />
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getAllFields,
})(ProductStructure);
