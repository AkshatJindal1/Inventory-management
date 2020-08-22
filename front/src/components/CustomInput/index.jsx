import { TextField } from "@material-ui/core";
import validator from 'validator';
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { useStyles } from '../../assets/jss/customInputStyle';

class CustomInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    const { value, conditions } = this.props;
    const { isError } = this.validateUtil(value, conditions)
    this.props.changeErrorStatus(isError, this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.validateNow !== prevProps.validateNow && this.props.validateNow) {
      this.validate(this.props.value, this.props.conditions)
    }
  }

  validate = (value, conditions) => {
    const { isError, errorText } = this.validateUtil(value, conditions)
    this.setState({ error: isError, errorText })
    this.props.changeErrorStatus(isError, this.props.id)
  }

  validateField = (event) => {
    const { conditions, changeErrorStatus } = this.props;
    const value = event.target.value;
    this.validate(value, conditions)
  }

  validateUtil = (value, conditions) => {
    let isError = false;
    let errorText = ''
    if (conditions !== undefined) {
      conditions.forEach(condition => {
        if (condition.type === 'required' && validator.isEmpty(value)) {
          isError = true;
          errorText = condition.errorText;
          return;
        }

        else if (condition.type === 'integer') {
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

  render() {

    const {
      labelText,
      id,
      value,
      handleChange,
      disabled,
      required,
      classes,
      defaultValue
    } = this.props;

    return (
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