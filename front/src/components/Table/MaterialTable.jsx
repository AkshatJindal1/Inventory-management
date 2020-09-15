import { Button, Card } from '@material-ui/core'
import React, { Component, Fragment } from 'react'

import Filters from '../Filters'
import MUIDataTable from 'mui-datatables'
import { connect } from 'react-redux'

export class MaterialTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: 'asc',
            orderBy: '0',
            page: 0,
            rowsPerPage: 5,
            selectedRowIndex: [],
            searchText: '',
        }
    }
    changeTableSpecificFilter = (page, searchText, sortOrder, rowsPerPage) => {
        this.setState(
            {
                page: page,
                rowsPerPage: rowsPerPage,
                orderBy: sortOrder.name,
                order: sortOrder.direction,
                serachText: searchText,
            },
            () => {
                console.log(this.state)
                const filterOptions = {
                    pageNumber: page,
                    recordsPerPage: rowsPerPage,
                    sortBy: sortOrder.name,
                    descending: sortOrder.direction === 'desc',
                    searchText: searchText,
                    filter: this.props.filterCategories,
                }
                console.log(this.props.token)
                this.props.getAllProducts(filterOptions)
            }
        )
    }

    rowSelectionChange = (selectedRows) => {
        const selectedRowIndex = selectedRows.map((row) => row.index)
        this.setState({ selectedRowIndex })
    }

    rowDelete = () => {
        const { data } = this.props
        const { selectedRowIndex } = this.state
        const productUids = data
            .filter((d, index) => selectedRowIndex.indexOf(index) !== -1)
            .map((product) => product.uid)
        this.props.deleteRows(productUids)
        console.log(this.state)
    }

    filterSubmit = (filterCategories) => {
        this.props.onFilterSubmit(filterCategories)
        this.changeTableSpecificFilter(
            0,
            '',
            { name: this.state.orderBy, direction: this.state.order },
            this.state.rowsPerPage
        )
    }

    render() {
        const {
            filterCategories,
            data,
            columns,
            options,
            isTableLoading,
            filterTitle,
            tableTitle,
        } = this.props
        console.log(data)
        let optionsDefault = {
            onTableChange: (action, tableState) => {
                console.log(action, tableState)

                switch (action) {
                    case 'changePage':
                        this.changeTableSpecificFilter(
                            tableState.page,
                            tableState.searchText || '',
                            tableState.sortOrder,
                            tableState.rowsPerPage
                        )
                        break
                    case 'sort':
                        this.changeTableSpecificFilter(
                            tableState.page,
                            tableState.searchText || '',
                            tableState.sortOrder,
                            tableState.rowsPerPage
                        )
                        break
                    case 'changeRowsPerPage':
                        this.changeTableSpecificFilter(
                            tableState.page,
                            tableState.searchText || '',
                            tableState.sortOrder,
                            tableState.rowsPerPage
                        )
                        break
                    case 'search':
                        this.changeTableSpecificFilter(
                            tableState.page,
                            tableState.searchText || '',
                            tableState.sortOrder,
                            tableState.rowsPerPage
                        )
                        break
                    case 'rowSelectionChange':
                        this.rowSelectionChange(tableState.selectedRows.data)
                        break
                    case 'rowDelete':
                        this.rowDelete(tableState.previousSelectedRow.index)
                        break
                    default:
                        console.log('action not handled.')
                }
            },
            // https://github.com/gregnb/mui-datatables
            rowsPerPage: this.state.rowsPerPage,
            download: true,
            serverSide: true,
            elevation: 0,
            enableNestedDataAccess: '.',
            filter: false,
            fixedHeader: true,
            jumpToPage: true,
            pagination: true,
            print: true,
            responsive: 'vertical', // stacked, vertica, simple
            rowHover: true,
            rowsPerPageOptions: [5, 10, 20, 50, 100],
            search: true,
            searchPlaceholder: 'Enter the search text',
            searchOpen: false,
            selectableRows: 'multiple', //multiple, single, none
            selectToolbarPlacement: 'replace', //replace, above, none
            sort: true,
            viewColumns: true,
            downloadOptions: {
                filename: `${tableTitle}.csv`,
                seperator: ',',
                filterOptions: {
                    useDisplayedColumnsOnly: false,
                    useDisplayedRowsOnly: false,
                },
            },
            onRowClick: (rowData, rowMeta) => {
                this.props.onRowClick(data[rowMeta.dataIndex])
            },
        }

        optionsDefault = { ...optionsDefault, ...options }

        return (
            <Fragment>
                {!isTableLoading ? (
                    <Card variant="outlined">
                        {filterCategories.length > 0 ? (
                            <Filters
                                filterCategories={filterCategories}
                                popupTitle={filterTitle}
                                onFilterSubmit={this.filterSubmit}
                            />
                        ) : null}

                        <MUIDataTable
                            title={tableTitle}
                            data={data}
                            columns={columns}
                            options={optionsDefault}
                        />
                    </Card>
                ) : null}
            </Fragment>
        )
    }
}

const mapStateToProps = ({}) => ({})

export default connect(mapStateToProps, {})(MaterialTable)
