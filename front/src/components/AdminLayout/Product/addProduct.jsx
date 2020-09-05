import React, { Component } from 'react'

import AddForm from '../../AddForm/addForm'
import Loader from '../../Loader'
import { connect } from 'react-redux'
import { getFormData } from '../../../store/actions/formAction'
import { getProduct } from '../../../store/actions/productAction'

export class ProductLanding extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formFields: [],
            formName: '',
            formId: '',

            // Fetching Structure State
            loading: true,
            failed: false,
            errorMsg: 'Something went wrong',

            // Fetching Data State
            fetchedData: {},
            fetchingDataError: false,
            fetchingLoading: true,
        }
    }

    isLoading = (form) => {
        const formName = form.name
        const formFields = form.fields
        const formId = form.formId
        const option = form.option ? 'options' : 'products'
        this.setState({ loading: false, formFields, formName, formId, option })
    }

    onError = (err) => {
        console.log(err)
        this.setState({ failed: true, loading: false, errorMsg: err })
    }

    onFetchDataSuccess = (fetchedData) => {
        this.setState({
            fetchedData,
            fetchingDataError: false,
            fetchingLoading: false,
        })
    }

    onFetchDataError = (error) => {
        console.log(error)
        this.setState({
            fetchingDataError: true,
            fetchingLoading: false,
        })
    }

    componentWillMount() {
        this.props.getFormData(
            this.isLoading,
            this.onError,
            this.props.match.params.formUrl,
            this.props.match.params.option
        )
        if (this.props.match.params.itemId != null)
            this.props.getProduct(
                this.onFetchDataSuccess,
                this.onFetchDataError,
                this.props.match.params.option,
                this.props.match.params.formUrl,
                this.props.match.params.itemId
            )
        else {
            this.setState({ fetchingLoading: false })
        }
    }

    render() {
        if (this.state.loading || this.state.fetchingLoading) return <Loader />
        else if (this.state.failed || this.state.fetchingDataError)
            return <span>{this.state.errorMsg}</span>
        else
            return (
                <AddForm
                    initialFValues={this.state.fetchedData}
                    formStructure={this.state.formFields}
                    formName={this.state.formName}
                    formId={this.state.formId}
                    option={this.props.match.params.option}
                    redirectTo={'/tables'}
                />
            )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    getFormData,
    getProduct,
})(ProductLanding)
