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
            option: false,
        }
    }

    existingFormLoader = (form) => {
        const formName = form.name
        const formFields = form.fields
        const formId = form.formId
        const option = form.option ? 'option' : 'product'
        this.setState({
            loading: false,
            formFields,
            formName,
            formId,
            option,
        })
    }

    newFormLoader = (form) => {
        const formFields = form
        this.setState({
            loading: false,
            formFields,
            option: this.props.match.params.option,
        })
    }

    onError = (err) => {
        this.setState({ failed: true, loading: false, errorMsg: err })
    }

    updateUrl = (formFields) => {
        console.log('Calling API with ', formFields)
    }

    componentWillMount() {
        if (this.props.match.params.productUrl === 'new-form')
            this.props.getDefaultFormData(
                this.newFormLoader,
                this.onError,
                this.props.match.params.option
            )
        else
            this.props.getFormData(
                this.existingFormLoader,
                this.onError,
                this.props.match.params.productUrl,
                this.props.match.params.option
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
                    option={this.state.option}
                />
            )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    getFormData,
    getDefaultFormData,
})(ProductStructure)
