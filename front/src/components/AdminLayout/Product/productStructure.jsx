import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import formFields from '../../../demo/products'
import StructureForm from '../../AddForm/structureForm'

export class ProductStructure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forms: {},
        }
    }

    render() {
        return <StructureForm formFields={formFields} />
    }
}

export default ProductStructure
