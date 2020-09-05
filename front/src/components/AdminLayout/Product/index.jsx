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
            // columns: [
            //     {
            //         name: 'productId',
            //         label: 'Product ID',
            //         options: {
            //             sort: true,
            //         },
            //     },
            //     {
            //         name: 'productName',
            //         label: 'Name',
            //         options: {
            //             sort: true,
            //         },
            //     },
            //     {
            //         name: 'description',
            //         label: 'Description',
            //         options: {
            //             sort: true,
            //         },
            //     },
            //     {
            //         name: 'cost',
            //         label: 'Cost',
            //         options: {
            //             sort: true,
            //         },
            //     },
            //     {
            //         name: 'productDetails.size',
            //         label: 'Size',
            //         options: {
            //             sort: true,
            //         },
            //     },
            //     {
            //         name: 'quantityInStock',
            //         label: 'Quantity In Stock',
            //         options: {
            //             sort: true,
            //         },
            //     },
            //     {
            //         name: 'ratings',
            //         label: 'Ratings',
            //         empty: true,
            //     },
            // ],
        }
    }

    componentDidMount() {
        this.props.getColumns('products', 'clothing')
        this.props.getAllProducts('products', 'clothing')
        // this.props.getCategories()
    }

    getAllProducts = (filterOptions) => {
        this.props.getAllProducts('products', 'clothing', filterOptions)
    }

    deleteRows = (productUids) => {
        this.props.deleteProducts(productUids)
    }

    filterSubmit = (filterCategories) => {
        this.props.setCategories(filterCategories)
        getAllProducts(filterCategories)
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
    getCategories,
    setCategories,
    getColumns,
})(ProductLanding)
