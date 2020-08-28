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
        const option = form.option ? 'option' : 'product'
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
            this.props.match.params.productUrl,
            this.props.match.params.option
        )
        if (this.props.match.params.productId != null)
            this.props.getProduct(
                this.onFetchDataSuccess,
                this.onFetchDataError,
                this.props.match.params.productId
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
                />
            )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    getFormData,
    getProduct,
})(ProductLanding)
