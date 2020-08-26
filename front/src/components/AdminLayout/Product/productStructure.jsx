import React, { Component } from "react";
import { connect } from "react-redux";

import StructureForm from '../../AddForm/structureForm'
import StructureFormCopy from '../../AddForm/StructureFormCopy'
import { getAllFields } from "../../../store/actions/productAction";
import Loader from '../../Loader'

import formFields from '../../../demo/formFields'
import datatypes from '../../../demo/datatypesCopy'


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
    // this.props.getAllFields(this.isLoading);
  }

  render() {
    return (
      <>
        {/* <StructureForm formFields={formFields} /> */}
        <StructureFormCopy formFields={formFields} datatypes={datatypes} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getAllFields,
})(ProductStructure);
