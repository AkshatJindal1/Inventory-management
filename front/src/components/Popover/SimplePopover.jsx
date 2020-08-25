import React, { Component }  from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { IconButton, Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Filter from "../Filters";
import { connect } from "react-redux";

class SimplePopover extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };
  render() {
    const {open} = this.state
    const {filterOptions} = this.props
  return (
    <div>
      <IconButton onClick={this.handleClickOpen} aria-label="filter list">
        <FilterListIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter</DialogTitle>

        {/* <MUIDataTable title={"Employee List"} data={data} columns={columns} /> */}

        <Box m={2}>
          <Filter filterOptions={filterOptions}/>
        </Box>

        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps,{})(SimplePopover);
