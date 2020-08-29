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
} from '../../../store/actions/productAction'

import Filters from '../../Filters'
import MUIDataTable from 'mui-datatables'
import SimplePopover from '../../Popover/SimplePopover'
import Table from '../../Table/Table'
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
            columns: [
                {
                    name: 'productId',
                    label: 'Product ID',
                    options: {
                        filter: true,
                    },
                },
                {
                    name: 'productName',
                    label: 'Name',
                    options: {
                        filter: true,
                    },
                },
                {
                    name: 'description',
                    label: 'Description',
                    options: {
                        filter: true,
                    },
                },
                {
                    name: 'cost',
                    label: 'Cost',
                    options: {
                        filter: true,
                    },
                },
                {
                    name: 'productDetails.size',
                    label: 'Size',
                    options: {
                        filter: true,
                    },
                },
                {
                    name: 'quantityInStock',
                    label: 'Quantity In Stock',
                    options: {
                        filter: true,
                    },
                },
                {
                    name: 'ratings',
                    label: 'Ratings',
                    empty: true,
                },
            ],
        }
    }

    componentDidMount() {
        this.props.getAllProducts()
        this.props.getCategories()
    }

    sort = (page, searchText, sortOrder) => {
        this.setState({ isLoading: true })
        this.xhrRequest(
            `http://localhost:8080/prodcuts`,
            page,
            this.state.rowsPerPage,
            searchText,
            sortOrder
        ).then((res) => {
            this.setState({
                data: res.data,
                page: res.page,
                sortOrder,
                isLoading: false,
                count: res.total,
            })
        })
    }

    changePage = (page, searchText, sortOrder) => {
        this.setState({
            isLoading: true,
        })
        this.xhrRequest(
            `http://localhost:8080/products`,
            page,
            this.state.rowsPerPage,
            searchText,
            sortOrder
        ).then((res) => {
            this.setState({
                isLoading: false,
                page: res.page,
                sortOrder,
                data: res.data,
                count: res.total,
            })
        })
    }

    changeRowsPerPage = (rowsPerPage, searchText, sortOrder) => {
        this.setState({
            isLoading: true,
            rowsPerPage,
        })
        this.xhrRequest(
            `http://localhost:8080/products`,
            0,
            rowsPerPage,
            searchText,
            sortOrder
        ).then((res) => {
            this.setState({
                isLoading: false,
                page: res.page,
                sortOrder,
                data: res.data,
                count: res.total,
                rowsPerPage: res.rowsPerPage,
            })
        })
    }

    search = (searchText, sortOrder) => {
        const { rowsPerPage } = this.state
        this.setState({
            isLoading: true,
        })
        this.xhrRequest(
            `http://localhost:8080/products`,
            0,
            rowsPerPage,
            searchText || '',
            sortOrder
        ).then((res) => {
            this.setState({
                isLoading: false,
                page: res.page,
                sortOrder,
                data: res.data,
                count: res.total,
                rowsPerPage: res.rowsPerPage,
            })
        })
    }

    filterChange = () => {}

    xhrRequest = (url, page, rowsPerPage, searchText = '', sortOrder = {}) => {
        return new Promise((resolve, reject) => {
            // mock page data

            let fullData = [
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '1001',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 235.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '1002',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 236.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '1003',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 237.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '1004',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 236.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '1005',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '1006',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '1007',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '1008',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '1009',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '10010',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '10011',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '10012',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e74ea21fb8798d114d1d',
                    productId: '10013',
                    productName: 'T-Shirt',
                    description: 'Blue t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
                {
                    _id: '5f41e759a21fb8798d114d1f',
                    productId: '10014',
                    productName: 'T-Shirt',
                    description: 'Yellow t-shirt',
                    cost: 234.0,
                    productDetails: {
                        size: 'M',
                    },
                    quantityInStock: 780,
                    ratings: null,
                },
            ]
            const total = fullData.length // mock record count from server - normally this would be a number attached to the return data

            let sortField = sortOrder.name
            let sortDir = sortOrder.direction

            if (sortField) {
                fullData = fullData.sort((a, b) => {
                    if (a[sortField] < b[sortField]) {
                        return 1 * (sortDir === 'asc' ? -1 : 1)
                    } else if (a[sortField] > b[sortField]) {
                        return -1 * (sortDir === 'asc' ? -1 : 1)
                    } else {
                        return 0
                    }
                })
            }

            if (searchText !== '') {
                fullData = fullData.filter((row) => {
                    return Object.values(row).some((cell) =>
                        `${cell}`
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                    )
                })
            }

            const srcData = fullData.slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage
            )
            let data = srcData

            setTimeout(() => {
                resolve({
                    data,
                    total,
                    page,
                    rowsPerPage,
                })
            }, 500)
        })
    }

    setOrder = (isAscending) => {
        isAscending
            ? this.setState({ order: 'desc' })
            : this.setState({ order: 'asc' })
    }

    setOrderBy = (property) => {
        this.setState({ orderBy: property })
    }

    handleRequestSort = (event, property) => {
        const { order, orderBy } = this.state
        const isAsc = orderBy === property && order === 'asc'
        this.setOrder(isAsc)
        this.setOrderBy(property)
    }

    handlePageChange = () => {}

    handleFilterSubmit = (applyFilters) => {
        applyFilters()
    }

    render() {
        const { count, rowsPerPage, columns } = this.state
        const {
            categories,
            products: data,
            isLoading,
            isCategoriesLoading,
        } = this.props

        const options = {
            // https://github.com/gregnb/mui-datatables
            filterType: 'multiselect',
            caseSensitive: false,
            download: true,
            serverSide: true,
            count: count,
            downloadOptions: {
                filename: 'Product.csv',
                seperator: ',',
                filterOptions: {
                    useDisplayedColumnsOnly: false,
                    useDisplayedRowsOnly: false,
                },
            },
            elevation: 0,
            enableNestedDataAccess: '.',
            filter: false,
            fixedHeader: true,
            jumpToPage: true,
            confirmFilters: true,
            onTableChange: (action, tableState) => {
                // console.log(action, tableState);

                // a developer could react to change on an action basis or
                // examine the state as a whole and do whatever they want

                switch (action) {
                    case 'changePage':
                        this.changePage(
                            tableState.page,
                            tableState.searchText || '',
                            tableState.sortOrder
                        )
                        break
                    case 'sort':
                        this.sort(
                            tableState.page,
                            tableState.searchText || '',
                            tableState.sortOrder
                        )
                        break
                    case 'changeRowsPerPage':
                        this.changeRowsPerPage(
                            tableState.rowsPerPage,
                            tableState.searchText || '',
                            tableState.sortOrder
                        )
                        break
                    case 'search':
                        this.search(
                            tableState.searchText || '',
                            tableState.sortOrder
                        )
                        break
                    default:
                        console.log('action not handled.')
                }
            },
            customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
                return (
                    <div style={{ marginTop: '40px' }}>
                        <Button
                            variant="contained"
                            onClick={() =>
                                this.handleFilterSubmit(applyNewFilters)
                            }
                        >
                            Apply Filters
                        </Button>
                    </div>
                )
            },
            pagination: true,
            print: true,
            responsive: 'vertical', // stacked, vertica, simple
            rowHover: true,
            rowsPerPage: rowsPerPage,
            rowsPerPageOptions: [2, 5, 10, 100],
            search: true,
            searchPlaceholder: 'Enter the search text',
            searchOpen: false,
            selectableRows: 'multiple', //multiple, single, none
            selectToolbarPlacement: 'replace', //replace, above, none
            sort: true,
            viewColumns: true,
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
                {!isLoading ? (
                    <Card variant="outlined">
                        {!isCategoriesLoading ? (
                            <Filters
                                filterCategories={categories}
                                popupTitle="Products FIlter"
                            />
                        ) : null}
                        <MUIDataTable
                            title={'Employee List'}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </Card>
                ) : (
                    <Card>Data is Loading</Card>
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = ({
    product: { allProducts, isLoading, isCategoriesLoading, allCategories },
}) => ({
    products: allProducts,
    isLoading,
    isCategoriesLoading,
    categories: allCategories,
})

export default connect(mapStateToProps, { getAllProducts, getCategories })(
    ProductLanding
)
