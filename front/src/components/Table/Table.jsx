import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import styles from "../Assets/jss/tableStyle.js";
import TablePagination from "@material-ui/core/TablePagination";
import TableHeader from "./TableHeader.jsx";

class ReactTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 2,
      order: "asc",
      orderBy: "0",
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 });
  };

  // handleRequestSort = (prop) => (event) => {
  //   this.props.onRequestSort(event, prop);
  // };

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  };

  setOrder = (isAscending) => {
    isAscending
      ? this.setState({ order: "desc" })
      : this.setState({ order: "asc" });
  };

  setOrderBy = (property) => {
    this.setState({ orderBy: property });
  };

  handleRequestSort = (event, property) => {
    const { order, orderBy } = this.state;
    const isAsc = orderBy === property && order === "asc";
    this.setOrder(isAsc);
    this.setOrderBy(property);
  };

  render() {
    const { classes, tableHead, tableHeaderColor, tableData } = this.props;

    const { page, rowsPerPage, orderBy, order } = this.state;
    return (
      <Paper>
        <div className={classes.tableResponsive}>
          <Table className={classes.table}>
            {tableHead !== undefined ? (
              <TableHeader
                tableHead={tableHead}
                tableHeaderColor={tableHeaderColor}
                onRequestSort={this.handleRequestSort}
                classes={classes}
              />
            ) : null}
            <TableBody>
              {this.stableSort(tableData, this.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((prop, key) => {
                  return (
                    <TableRow key={key} className={classes.tableBodyRow}>
                      {prop.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
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
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  {}
)(withWidth()(withStyles(styles, { withTheme: true })(ReactTable)));
