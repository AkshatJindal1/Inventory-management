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
    getCategories,
    getColumns,
    setCategories,
} from '../../../store/actions/productAction'

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
        this.state = {
            order: 'asc',
            orderBy: '0',
            page: 0,
            count: 1,
            rowsPerPage: 5,
            isLoading: false,
            redirectTo: null,
        }
    }

    componentDidMount() {
        this.props.getColumns(
            this.props.match.params.options,
            this.props.match.params.formUrl
        )
        this.props.getAllProducts(
            this.props.match.params.options,
            this.props.match.params.formUrl
        )
        // this.props.getCategories()
    }

    getAllProducts = (filterOptions) => {
        this.props.getAllProducts(
            this.props.match.params.options,
            this.props.match.params.formUrl,
            filterOptions
        )
    }

    deleteRows = (productUids) => {
        this.props.deleteProducts(productUids)
    }

    filterSubmit = (filterCategories) => {
        this.props.setCategories(filterCategories)
        getAllProducts(filterCategories)
    }

    rowClick = (data) => {
        console.log(data)
        this.setState({
            redirectTo: (
                <Redirect
                    to={`/form/${this.props.match.params.options}/${this.props.match.params.formUrl}/${data.url}`}
                />
            ),
        })
    }

    render() {
        // const { columns } = this.state
        const {
            categories,
            products: data,
            isLoading,
            isCategoriesLoading,
            columns,
        } = this.props

        const options = {
            caseSensitive: false,
        }
        return (
            <Fragment>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed
                    adipiscing. Amet nisl suscipit adipiscing bibendum est
                    ultricies integer quis. Cursus euismod quis viverra nibh
                    cras. Metus vulputate eu scelerisque felis imperdiet proin
                    fermentum leo. Mauris commodo quis imperdiet massa
                    tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
                    At augue eget arcu dictum varius duis at consectetur lorem.
                    Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
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
                />
                {this.state.redirectTo}
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
    getCategories,
    setCategories,
    getColumns,
})(ProductLanding)
