import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import styles from '../../assets/jss/tableStyle.js'
import TablePagination from '@material-ui/core/TablePagination'
import TableHeader from './TableHeader'
import TableToolBar from './TableToolBar'
import { Checkbox } from '@material-ui/core'

class ReactTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowsPerPage: 2,
            order: 'asc',
            orderBy: '0',
            selected: [],
            dense: false,
        }
    }

    handleSelectAllClick = (event) => {
        const { tableData } = this.props
        if (event.target.checked) {
            const newSelected = tableData.map((n) => n[0])
            this.setState({ selected: newSelected })
            return
        }
        this.setState({ selected: [] })
    }

    handleClick = (event, id) => {
        const { selected } = this.state
        console.log(id, selected)
        const selectedIndex = selected.indexOf(id)

        let newSelected = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }
        this.setState({ selected: newSelected })
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value, page: 0 })
    }

    stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedThis.map((el) => el[0])
    }

    descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy)
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

    isSelected = (id) => {
        return this.state.selected.indexOf(id) !== -1
    }

    render() {
        const {
            classes,
            tableHead,
            tableHeaderColor,
            tableData,
            heading,
        } = this.props

        const { page, rowsPerPage, orderBy, order, selected } = this.state

        return (
            <Card variant="outlined">
                <CardContent>
                    <TableToolBar
                        classes={classes}
                        numSelected={selected.length}
                        heading={heading}
                    />
                    <Table stickyHeader className={classes.table}>
                        {tableHead !== undefined ? (
                            <TableHeader
                                tableHead={tableHead}
                                tableHeaderColor={tableHeaderColor}
                                onRequestSort={this.handleRequestSort}
                                classes={classes}
                                onSelectAllClick={this.handleSelectAllClick}
                                rowCount={tableData.length}
                                numSelected={selected.length}
                            />
                        ) : null}
                        <TableBody>
                            {this.stableSort(
                                tableData,
                                this.getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((prop, key) => {
                                    const isItemSelected = this.isSelected(
                                        prop[0]
                                    )
                                    const labelId = `enhanced-table-checkbox-${key}`
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                this.handleClick(event, prop[0])
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={key}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            {prop.map((prop, key) => {
                                                return (
                                                    <TableCell key={key}>
                                                        {prop}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(
    mapStateToProps,
    {}
)(withWidth()(withStyles(styles, { withTheme: true })(ReactTable)))
