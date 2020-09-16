import {
    Button,
    Card,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Popover,
    Select,
    Slider,
} from '@material-ui/core'
import { CheckBox, ThreeSixty } from '@material-ui/icons'
import React, { Component, Fragment } from 'react'
import {
    getAllProducts,
    getColumns,
    getInitialState,
    setCategories,
} from '../../../store/actions/productAction'

import CustomizedButtons from '../../CustomButton'
import Filters from '../../Filters'
import MUIDataTable from 'mui-datatables'
import { MaterialTable } from '../../Table/MaterialTable'
import { Redirect } from 'react-router-dom'
import SimplePopover from '../../Popover/SimplePopover'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

export class ProductLanding extends Component {
    constructor(props) {
        super(props)
        this.props.getColumns(
            this.props.match.params.options,
            this.props.match.params.formUrl,
            this.props.token
        )
        this.props.getAllProducts(
            this.props.match.params.options,
            this.props.match.params.formUrl,
            this.props.token
        )
        this.state = {
            order: 'asc',
            orderBy: '0',
            page: 0,
            count: 1,
            rowsPerPage: 5,
            redirectTo: null,
            isPageLoading: true,
        }
    }

    componentDidMount() {
        this.props.getInitialState()
        this.props.getColumns(
            this.props.match.params.options,
            this.props.match.params.formUrl,
            this.props.token
        )
        this.props.getAllProducts(
            this.props.match.params.options,
            this.props.match.params.formUrl,
            this.props.token
        )
    }

    getAllProducts = (filterOptions) => {
        this.props.getAllProducts(
            this.props.match.params.options,
            this.props.match.params.formUrl,
            this.props.token,
            filterOptions
        )
    }

    deleteRows = (productUids) => {
        this.props.deleteProducts(productUids)
    }

    filterSubmit = (filterCategories) => {
        this.props.setCategories(filterCategories, this.props.token)
        getAllProducts(filterCategories)
    }

    rowClick = (data) => {
        this.setState({
            redirectTo: (
                <Redirect
                    to={`/form/${this.props.match.params.options}/${this.props.match.params.formUrl}/${data.url}`}
                />
            ),
        })
    }

    handleButtonClick = () => {
        this.setState({
            redirectTo: (
                <Redirect
                    to={`/form/${this.props.match.params.options}/${this.props.match.params.formUrl}`}
                />
            ),
        })
    }

    render() {
        const {
            categories,
            products: data,
            isLoading,
            columns,
            totalRows,
        } = this.props

        const options = {
            caseSensitive: false,
            count: totalRows,
        }

        console.log('isLoading', isLoading)

        return (
            <Fragment>
                <MaterialTable
                    filterCategories={categories}
                    data={data}
                    columns={columns}
                    options={options}
                    filterTitle="Products Filter"
                    tableTitle="Products"
                    isTableLoading={isLoading}
                    getAllProducts={this.getAllProducts}
                    deleteRows={this.deleteRows}
                    onFilterSubmit={this.filterSubmit}
                    onRowClick={this.rowClick}
                    token={this.props.token}
                />
                {this.state.redirectTo}
                <CustomizedButtons
                    id="add"
                    buttonType="add"
                    children="Add Product"
                    handleSubmit={this.handleButtonClick}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = ({
    product: {
        allProducts,
        isLoading,
        isCategoriesLoading,
        allCategories,
        totalProducts,
        columns,
    },
}) => ({
    products: allProducts,
    isLoading,
    isCategoriesLoading,
    categories: allCategories,
    totalRows: totalProducts,
    columns,
})

export default connect(mapStateToProps, {
    getAllProducts,
    setCategories,
    getColumns,
    getInitialState,
})(ProductLanding)
