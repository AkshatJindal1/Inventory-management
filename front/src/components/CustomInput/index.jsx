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
    index,
    labelText,
    id,
    value,
    handleChange,
    error,
    disabled,
    required,
    helperText,
    validateField
  } = props;

  return (
    <TextField
      variant="outlined"
      fullWidth="true"
      id={id}
      label={labelText}
      value={value}
      error={error}
      required={required}
      disabled={disabled}
      className={classes.textInput}
      onChange={handleChange}
      helperText={error ? helperText : ''}
      onBlur={(e) => validateField(e, index)}
    />
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  id: PropTypes.string
};
