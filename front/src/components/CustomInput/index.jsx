import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from '../../assets/jss/customInputStyle';
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    labelText,
    id,
  } = props;

  return (
    <TextField variant="outlined" fullWidth="true" id={id} label={labelText} className={classes.textInput} />
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  id: PropTypes.string
};
