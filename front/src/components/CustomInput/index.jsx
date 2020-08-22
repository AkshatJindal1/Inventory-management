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
    this.setState({ error: this.props.error })
  }

  setError = (errorText) => {
    this.setState({ error: true, errorText })
  }

  unsetError = () => {
    this.setState({ error: false, errorText: '' })
  }



  validateField = (event) => {
    const value = event.target.value;
    const { conditions } = this.props;

    let isError = false;

    if (conditions !== undefined) {
      conditions.forEach(condition => {

        if (condition.type === 'required' && validator.isEmpty(value)) {
          this.setError(condition.errorText)
          isError = true;
        }

        else if (condition.type === 'integer') {
          let minMaxCondition = {};
          if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
          if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
          if (!validator.isInt(value, { ...minMaxCondition })) {
            this.setError(condition.errorText)
            isError = true;
          }
        }

        else if (condition.type === 'float') {

          // TODO min not working properly

          let minMaxCondition = {};
          if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
          if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
          if (!validator.isFloat(value, { ...minMaxCondition })) {
            this.setError(condition.errorText)
            isError = true;
          }
        }

        else if (condition.type === 'email') {
          if (!validator.isEmail(value)) {
            this.setError(condition.errorText)
            isError = true;
          }
        }
      });
    }
    if (!isError) this.unsetError();
  }

  render() {

    const {
      labelText,
      id,
      value,
      handleChange,
      disabled,
      required,
      classes
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