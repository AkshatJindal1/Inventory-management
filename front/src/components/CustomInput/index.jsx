import { TextField } from "@material-ui/core";
import validator from 'validator';
import React, { Component } from "react";

class CustomInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  validateField = (event) => {
    const value = event.target.value;
    const { conditions } = this.props;

    if (conditions !== undefined) {
      conditions.forEach(condition => {
        if (condition.type === 'required') {
          if (validator.isEmpty(value)) this.setState({ error: true })
          else this.setState({ error: false });
        }
        else if (condition.type === 'integer') {
          let minMaxCondition = {};
          if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
          if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
          if (validator.isInt(value, { ...minMaxCondition })) this.setState({ error: false })
          else this.setState({ error: true })
        }
        else if (condition.type === 'float') {
          let minMaxCondition = {};
          if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
          if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
          if (validator.isFloat(value, { ...minMaxCondition })) this.setState({ error: false })
          else this.setState({ error: true })
        }
        else if (condition.type === 'email') {
          if (validator.isEmail(value)) this.setState({ error: false });
          else this.setState({ error: true })
        }
      });
    }
  }

  render() {

    const {
      labelText,
      id,
      value,
      handleChange,
      error,
      disabled,
      required,
      helperText,
      conditions
    } = this.props;

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
        // className={classes.textInput}
        onChange={handleChange}
        helperText={error ? helperText : ''}
        onBlur={(e) => this.validateField(e)}
      />
    );
  }
}

export default CustomInput;