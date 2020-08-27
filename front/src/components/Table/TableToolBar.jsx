import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withWidth from '@material-ui/core/withWidth'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import clsx from 'clsx'
import {
    TableSortLabel,
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList'

class TableToolBar extends Component {
    render() {
        const {
            classes,
            numSelected,
            heading,
            handleDelete,
            handleEdit,
            handleFilter,
        } = this.props

        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {heading}
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Fragment>
                        {numSelected === 1 ? (
                            <Tooltip title="Edit">
                                <IconButton
                                    onClick={handleEdit}
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        <Tooltip title="Delete">
                            <IconButton
                                aria-label="delete"
                                onCLick={handleDelete}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Fragment>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton
                            onClick={handleFilter}
                            aria-label="filter list"
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(withWidth()(TableToolBar))
