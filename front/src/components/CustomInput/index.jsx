import { TextField } from "@material-ui/core";
import validator from 'validator';
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useStyles } from '../../assets/jss/customInputStyle';

class CustomInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentWillMount() {
    const { value, condition, required, datatype } = this.props;
    const { isError } = this.validateUtil(value, condition, required, datatype)
    this.props.changeErrorStatus(isError, this.props.id)
    this.setState({ value });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value })
    }
    if (this.props.validateNow !== prevProps.validateNow && this.props.validateNow === true) {
      this.validate(prevProps.value, prevProps.condition, prevProps.required, prevProps.datatype)
    }
  }

  validate = (value, condition, required, datatype) => {
    const { isError, errorText } = this.validateUtil(value, condition, required, datatype)
    this.setState({ error: isError, errorText })
    this.props.changeErrorStatus(isError, this.props.id)
  }

  validateField = (event) => {
    const { condition, required, datatype } = this.props;
    const value = event.target.value;
    this.validate(value, condition, required, datatype)
  }

  validateUtil = (value, condition, required, datatype) => {
    let isError = false;
    let errorText = ''

    if (validator.isEmpty(value + '')) {
      if (required) {
        isError = true;
        errorText = "Value cannot be empty";
      }
    }

    else if (datatype === 'integer') {
      let minMaxCondition = {};
      if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
      if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
      if (!validator.isInt(value, { ...minMaxCondition })) {
        isError = true;
        errorText = condition.errorText;
      }
    }

    else if (datatype === 'float') {
      let minMaxCondition = {};
      if (condition.min !== undefined) minMaxCondition = { ...minMaxCondition, min: condition.min }
      if (condition.max !== undefined) minMaxCondition = { ...minMaxCondition, max: condition.max }
      if (!validator.isFloat(value, { ...minMaxCondition })) {
        isError = true;
        errorText = condition.errorText;
      }
    }

    else if (datatype === 'email') {
      if (!validator.isEmail(value)) {
        isError = true;
        errorText = condition.errorText;
      }
    }

    return {
      isError: isError,
      errorText: isError ? errorText : ''
    }
  }

  handleChange = (event) => {
    const { handleChange, datatype } = this.props
    const value = event.target.value;
    if (datatype === 'integer' || datatype === 'float') {
      if (!isNaN(value)) {
        this.setState({ value })
        handleChange(event)
      }
    }
    else {
      this.setState({ value })
      handleChange(event)
    }
  }

  render() {

    const {
      labelText,
      id,
      disabled,
      required,
      classes,
      menuitems
    } = this.props;

    if (menuitems) {

      const menu = menuitems.map((m, index) => {
        return <MenuItem key={index} value={m.id} name={id}>{m.labelText}</MenuItem>
      });

      return (
        <FormControl
          variant="outlined"
          className={
            classes.textInput
          }
          fullWidth="true"
          error={this.state.error}
          required={required}
          disabled={disabled}
          onBlur={(e) => this.validateField(e)}
        >
          <InputLabel id={"select-item-" + id}>{labelText}</InputLabel>
          <Select
            labelId={"select-item-" + id}
            name={id}
            id={"select-outlined-" + id}
            onChange={this.handleChange}
            value={this.state.value}
            label={labelText}
          >
            <MenuItem value="" disabled={required}>
              <em>Select {labelText}</em>
            </MenuItem>
            {menu}
          </Select>
          {this.state.error ? <FormHelperText>{this.state.errorText}</FormHelperText> : <span />}
        </ FormControl >)
    }

    else return (
      <TextField
        variant="outlined"
        fullWidth="true"
        id={id}
        label={labelText}
        value={this.state.value}
        error={this.state.error}
        required={required}
        disabled={disabled}
        className={classes.textInput}
        onChange={this.handleChange}
        helperText={this.state.error ? this.state.errorText : ''}
        onBlur={(e) => this.validateField(e)}
      />
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CustomInput);