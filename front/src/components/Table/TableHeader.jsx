import React, { Component } from 'react'
import { connect } from 'react-redux'
import withWidth from '@material-ui/core/withWidth'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { TableSortLabel, Checkbox } from '@material-ui/core'

class TableHeader extends Component {
    handleRequestSort = (prop) => (event) => {
        this.props.onRequestSort(event, prop)
    }

    render() {
        const {
            classes,
            tableHead,
            tableHeaderColor,
            orderBy,
            order,
            numSelected,
            rowCount,
            onSelectAllClick,
        } = this.props

        return (
            <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
                <TableRow className={classes.tableHeadRow}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all items' }}
                        />
                    </TableCell>
                    {tableHead.map((property, key) => {
                        return (
                            <TableCell
                                className={
                                    classes.tableCell +
                                    ' ' +
                                    classes.tableHeadCell
                                }
                                key={key}
                                align="left"
                                padding="default"
                                sortDirection={orderBy === key ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === key}
                                    direction={orderBy === key ? order : 'asc'}
                                    onClick={this.handleRequestSort(key)}
                                >
                                    {property}
                                </TableSortLabel>
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(withWidth()(TableHeader))
