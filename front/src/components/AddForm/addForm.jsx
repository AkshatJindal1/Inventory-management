import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from "react-redux";

import Controls from "../Controls/Controls";
import { Form } from '../Forms';
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

import ValidateFields from './validate'

const validateOnChange = true;

export class AddForm extends Component {
    validate = (fieldValues = this.state.values) => {

        let temp = { ...this.state.errors }
        const errorConditions = this.state.errorCondition;

        for (const [key, value] of Object.entries(fieldValues)) {

            const errorCondition = errorConditions[key];

            if (value === '') {
                temp = { ...temp, ...ValidateFields.isRequired(errorCondition, key) }
            }
            else if (errorCondition.datatype === 'number') {
                temp = { ...temp, ...ValidateFields.numberValidation(value, errorCondition, key) }
            }
            else if (errorCondition.datatype === 'email') {
                temp = { ...temp, ...ValidateFields.emailValidation(value, errorCondition, key) }
            }
            else if (errorCondition.datatype === 'text') {
                temp = { ...temp, ...ValidateFields.textValidation(value, errorCondition, key) }
            }
            else temp[key] = "";
        }

        this.setErrors({
            ...temp
        })

        if (fieldValues === this.state.values)
            return Object.values(temp).every(x => x === "")
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.validate()) {
            this.resetForm()
            console.log("Calling API", this.state.values)
        }
    }

    componentWillMount() {

        const initialFValues = this.props.initialFValues ? this.props.initialFValues : []
        const formStructure = this.props.formStructure ? this.props.formStructure : [];

        // Store the output json, and default values
        let values = {};

        // Stores Conditions for errors
        let errorCondition = {};

        // Store the Structure and Default Values for the Forms
        let structure = formStructure.map((field) => {
            const value = initialFValues.find(value => value.id === field.id)
            if (value !== undefined) {
                field.disabled = value.disabled ? true : false;
                field.value = value.value ? value.value : "";
                values[field.id] = field.value;
            }
            else {
                field.disabled = false;
                field.value = ""
                values[field.id] = ""
            }
            errorCondition[field.id] = {
                datatype: field.datatype,
                required: field.required ? true : false,
                conditions: field.conditions ? field.conditions : {}
            };

            if (field.datatype === 'checkbox') {
                field.value = field.value ? field.value : false
                values[field.id] = field.value
            }

            return field;
        })

        this.setState({ values, errors: {}, formStructure: structure, initialFValues: values, errorCondition })
    }

    setValues = (values) => {
        this.setState({ values });
    }

    setErrors = (errors) => {
        this.setState({ errors });
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setValues({
            ...this.state.values,
            [name]: value
        })
        if (validateOnChange)
            this.validate({ [name]: value })
    }

    resetForm = () => {
        console.log(this.state.initialFValues)
        this.setValues(this.state.initialFValues);
        this.setErrors({})
    }

    render() {

        const values = this.state.values;
        const errors = this.state.errors;
        const formStructure = this.state.formStructure;
        const handleInputChange = this.handleInputChange;
        const resetForm = this.resetForm;

        const inputFields = formStructure.map((field, index) => {
            if (field.type === 'input') {
                return (
                    <GridItem xs={12} sm={12} md={6}>
                        <Controls.Input
                            name={field.id}
                            label={field.labelText}
                            value={values[field.id]}
                            onChange={handleInputChange}
                            error={errors[field.id]}
                            disabled={field.disabled}
                        />
                    </GridItem>
                )
            } else if (field.type === 'checkbox') {
                return (
                    <GridItem xs={12} sm={12} md={6}>
                        <Controls.Checkbox
                            name={field.id}
                            label={field.labelText}
                            value={values[field.id] == "" ? false : true}
                            onChange={handleInputChange}
                            error={errors[field.id]}
                            disabled={field.disabled}
                        />
                    </GridItem>
                )
            } else if (field.type === 'select') {
                return (
                    <GridItem xs={12} sm={12} md={6}>
                        <Controls.Select
                            name={field.id}
                            label={field.labelText}
                            value={values[field.id]}
                            onChange={handleInputChange}
                            options={field.menuitems}
                            error={errors[field.id]}
                            disabled={field.disabled}
                        />
                    </GridItem>
                )
            }
        })

        return (
            <Card variant="outlined" >
                <CardContent>
                    <Form onSubmit={this.handleSubmit}>

                        <GridContainer>

                            {inputFields}

                            <GridItem xs={12} sm={12} md={6}>
                                <div>
                                    <Controls.Button
                                        type="submit"
                                        text="Submit" />
                                    <Controls.Button
                                        text="Reset"
                                        color="default"
                                        onClick={resetForm} />
                                </div>
                            </GridItem>
                        </GridContainer>
                    </Form >
                </CardContent >
            </Card >
        )
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(AddForm);
