import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import FilterList from "./FilterList";
import FilterProperties from './FilterProperties'
import { Switch } from "react-router-dom";
import {changeFilterOption} from '../../store/actions/filterAction'


const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class  Filter extends Component {

  render() {
    const {classes, filterOptions,selectedFilterIndex,changeFilterOption} = this.props;
  return (
    <div className={classes.root}>
      <FilterList 
        filterOptions={filterOptions}
        selectedIndex={selectedFilterIndex}
        onChangeOption={changeFilterOption}
         />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <FilterProperties selectedIndex={selectedFilterIndex} />
      </main>
    </div>
  );
  }
}

const mapStateToProps = (state) => ({
  selectedFilterIndex: state.filter.selectedFilterIndex
});

export default connect(
  mapStateToProps,
  {changeFilterOption}
)(withStyles(useStyles, { withTheme: true })(Filter));
