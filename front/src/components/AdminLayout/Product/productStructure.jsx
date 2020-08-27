import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loader from '../../Loader'
import StructureForm from '../../AddForm/StructureForm'
import datatypes from '../../../demo/datatypes'
import {
    getFormData,
    getDefaultFormData,
} from '../../../store/actions/productAction'

export class ProductStructure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            failed: false,
            errorMsg: 'Something went wrong',
            formFields: [],
            formName: '',
            formId: '',
        }
    }

    existingFormLoader = (form) => {
        const formName = form.name
        const formFields = form.fields
        const formId = form.formId
        this.setState({ loading: false, formFields, formName, formId })
    }

    newFormLoader = (form) => {
        const formFields = form
        this.setState({ loading: false, formFields })
    }

    onError = (err) => {
        console.log(err)
        this.setState({ failed: true, loading: false, errorMsg: err })
    }

    updateUrl = (formFields) => {
        console.log('Calling API with ', formFields)
    }

    componentWillMount() {
        if (this.props.match.params.productUrl === 'new-form')
            this.props.getDefaultFormData(this.newFormLoader, this.onError)
        else
            this.props.getFormData(
                this.existingFormLoader,
                this.onError,
                this.props.match.params.productUrl
            )
    }

    render() {
        if (this.state.loading) return <Loader />
        else if (this.state.failed) return <span>{this.state.errorMsg}</span>
        else
            return (
                <StructureForm
                    formFields={this.state.formFields}
                    datatypes={datatypes}
                    formName={this.state.formName}
                    formId={this.state.formId}
                />
            )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    getFormData,
    getDefaultFormData,
})(ProductStructure)
