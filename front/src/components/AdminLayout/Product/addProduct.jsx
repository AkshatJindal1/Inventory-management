import React, { Component } from "react";

import AddForm from "../../AddForm/addForm";
import Loader from '../../Loader'
import { connect } from "react-redux";
import formStructure from '../../../demo/formFields';
import { getFormData } from "../../../store/actions/productAction";
// import product from '../../../demo/products';

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      failed: false,
      errorMsg: "Something went wrong",
      formFields: [],
      formName: "",
      formId: ""
    };
  }

  isLoading = (form) => {
    console.log(form);
    const formName = form.name
    const formFields = form.fields
    const formId = form.formId;
    this.setState({ loading: false, formFields, formName, formId })
  }

  onError = (err) => {
    console.log(err);
    this.setState({ failed: true, loading: false, errorMsg: err })
  }

  componentWillMount() {
    this.props.getFormData(this.isLoading, this.onError, this.props.match.params.productUrl);
  }

  render() {

    if (this.state.loading) return <Loader />
    else if (this.state.failed) return <span>{this.state.errorMsg}</span>
    else return <AddForm initialFValues={this.props.initialFValues} formStructure={this.state.formFields} />;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getFormData,
})(ProductLanding);
