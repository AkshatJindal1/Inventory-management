import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import formFields from '../../../demo/config';
import AddForm from '../../AddForm/addForm'

export class ProductLanding extends Component {

    render() {
        return (
            <AddForm formFields={formFields} />
        );
    }
}

export default ProductLanding;
