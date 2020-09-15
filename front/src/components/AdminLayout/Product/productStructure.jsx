import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loader from '../../Loader'
import StructureForm from '../../AddForm/StructureForm'
import datatypes from '../../../demo/datatypes'
import {
    getFormData,
    getDefaultFormData,
} from '../../../store/actions/formAction'

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

    existingFormLoader = (form, datatypes) => {
        if (form == null || datatypes == null)
            return this.onError('Something Went Wrong')
        const formName = form.name
        const formFields = form.fields
        const formId = form.formId
        const datatypeList = this.getDataTypeList(datatypes)
        this.setState({
            loading: false,
            formFields,
            formName,
            formId,
            option: this.props.match.params.option,
            datatypes: datatypeList,
        })
    }

    getDataTypeList = (datatypes) => {
        return {
            System: datatypes.second,
            Custom: datatypes.first,
        }
    }

    newFormLoader = (form, datatypes) => {
        if (form == null || datatypes == null)
            return this.onError('Something Went Wrong')
        const datatypeList = this.getDataTypeList(datatypes)
        const formFields = form
        this.setState({
            loading: false,
            formFields,
            option: this.props.match.params.option,
            datatypes: datatypeList,
        })
    }

    onError = (err) => {
        console.log(err)
        this.setState({
            failed: true,
            loading: false,
            errorMsg: 'Somethign Went Wrong',
        })
    }

    updateUrl = (formFields) => {
        console.log('Calling API with ', formFields)
    }

    componentWillMount() {
        if (this.props.match.params.itemUrl == undefined)
            this.props.getDefaultFormData(
                this.newFormLoader,
                this.onError,
                this.props.match.params.option,
                this.props.token
            )
        else
            this.props.getFormData(
                this.existingFormLoader,
                this.onError,
                this.props.match.params.itemUrl,
                this.props.match.params.option,
                this.props.token
            )
    }

    render() {
        if (this.state.loading) return <Loader />
        else if (this.state.failed) return <span>{this.state.errorMsg}</span>
        else
            return (
                <StructureForm
                    formFields={this.state.formFields}
                    datatypes={this.state.datatypes}
                    formName={this.state.formName}
                    formId={this.state.formId}
                    option={this.state.option}
                    redirectTo={'/tables'}
                    token={this.props.token}
                />
            )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    getFormData,
    getDefaultFormData,
})(ProductStructure)
