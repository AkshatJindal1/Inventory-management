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

  componentDidMount() {
    const { value, conditions, required } = this.props;
    const { isError } = this.validateUtil(value, conditions, required)
    this.props.changeErrorStatus(isError, this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.validateNow !== prevProps.validateNow && this.props.validateNow) {
      this.validate(this.props.value, this.props.conditions, this.props.required)
    }
  }

  validate = (value, conditions, required) => {
    const { isError, errorText } = this.validateUtil(value, conditions, required)
    this.setState({ error: isError, errorText })
    this.props.changeErrorStatus(isError, this.props.id)
  }

  validateField = (event) => {
    const { conditions, changeErrorStatus, required } = this.props;
    const value = event.target.value;
    this.validate(value, conditions, required)
  }

  validateUtil = (value, conditions, required) => {
    let isError = false;
    let errorText = ''

    if (validator.isEmpty(value + '')) {
      if (required) {
        isError = true;
        errorText = "Value cannot be empty";
      }
    }
    else if (conditions !== undefined) {
      conditions.forEach(condition => {
        if (condition.type === 'integer') {
          let minMaxCondition = {};
          if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
          if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
          if (!validator.isInt(value, { ...minMaxCondition })) {
            isError = true;
            errorText = condition.errorText;
            return;
          }
        }

        else if (condition.type === 'float') {

          // TODO min not working properly

          let minMaxCondition = {};
          if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
          if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
          if (!validator.isFloat(value, { ...minMaxCondition })) {
            isError = true;
            errorText = condition.errorText;
            return;
          }
        }

        else if (condition.type === 'email') {
          if (!validator.isEmail(value)) {
            isError = true;
            errorText = condition.errorText;
            return;
          }
        }
      });
    }
    return {
      isError: isError,
      errorText: isError ? errorText : ''
    }
  }

  handleChange = (event) => {
    const { handleChange } = this.props
    console.log(event.target.id);
    // this.setState({ forms })
  }

  render() {

    const {
      labelText,
      id,
      value,
      handleChange,
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
            onChange={handleChange}
            value={value}
            label={labelText}
          >
            <MenuItem value="">
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
        value={value}
        error={this.state.error}
        required={required}
        disabled={disabled}
        className={classes.textInput}
        onChange={handleChange}
        helperText={this.state.error ? this.state.errorText : ''}
        onBlur={(e) => this.validateField(e)}
      />
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CustomInput);