import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from "react-redux";

import Controls from "../Controls/Controls";
import { Form } from '../Forms';
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

import ValidateFields from './validate'
import GetFields from './getFields'
import getType from './typeDatatypeMap'

import { saveForm } from '../../store/actions/productAction'

export class AddForm extends Component {
    validate = (fieldValues = this.state.values) => {

        let temp = this.state.errors

        const errorConditionRequired = {
            required: true,
            conditions: {}
        }

        const errorConditionNotRequired = {
            required: false,
            conditions: {}
        }

        for (const [key, value] of Object.entries(fieldValues)) {

            let thisTemp = {
                conditions: {}
            }

            if (value.labelText === '') {
                thisTemp = { ...thisTemp, ...ValidateFields.isRequired(errorConditionRequired, 'labelText') }
            }

            if (value.datatype === '') {
                thisTemp = { ...thisTemp, ...ValidateFields.isRequired(errorConditionRequired, 'datatype') }
            }

            if (value.conditions.min != null) {
                thisTemp = { ...thisTemp, conditions: { ...thisTemp.conditions, ...ValidateFields.numberValidation(value.conditions.min, errorConditionNotRequired, 'min') } }
            }

            if (value.conditions.max != null) {
                thisTemp = { ...thisTemp, conditions: { ...thisTemp.conditions, ...ValidateFields.numberValidation(value.conditions.max, errorConditionNotRequired, 'max') } }
            }

            temp[key] = thisTemp;
        }

        this.setErrors(temp)

        for (const [key, value] of Object.entries(temp)) {
            if (value.labelText || value.datatype || value.conditions.min || value.conditions.max) return false
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.validate()) {
            // this.resetForm()
            let res = Object.values(this.state.values);
            console.log("Calling API", res)
            this.props.saveForm((data) => console.log(data), res, this.props.requestPath)

        }
        else {
            console.log("Errors Exists")
        }
    }

    getDefaultValues = ({ id = "", labelText = "", datatype = "", required = false, conditions = { min: "", max: "", errorText: "" } }) => {
        return {
            id: id,
            labelText: labelText,
            datatype: datatype,
            required: required,
            conditions: conditions
        }
    }

    getDefaultErrors = () => {
        return {
            conditions: {}
        }
    }

    componentWillMount() {
        const matrix = this.props.formFields;
        console.log(matrix)
        let values = []
        let errors = []

        const structure = matrix.map((field, index) => {
            let row = [];
            values[index] = this.getDefaultValues(field)
            if (values[index].datatype == 'number') row = GetFields.number;
            else if (values[index].datatype == 'text') row = GetFields.text;
            else row = []
            errors[index] = this.getDefaultErrors()
            return row;
        })

        this.setState({ values, errors, formStructure: structure, initialFValues: [...values], initialErrors: [...errors] })
    }

    setValues = (values) => {
        this.setState({ values });
    }

    setErrors = (errors) => {
        this.setState({ errors });
    }

    setOptionalFields = (index, value) => {
        const formStructure = [...this.state.formStructure];
        if (value === 'number') {
            formStructure[index] = GetFields.number
        } else if (value === 'text') {
            formStructure[index] = GetFields.text
        }
        else formStructure[index] = []
        this.setState({ formStructure })
    }

    handleInputChange = (e, index, root = 'root') => {
        const { name, value } = e.target
        const values = this.state.values;

        if (root === 'root')
            values[index][name] = value;
        else
            values[index][root][name] = value;

        this.setValues(values)
        if (name === 'datatype')
            this.setOptionalFields(index, value)

    }

    // resetForm = () => {
    //     console.log(this.state.initialFValues)
    //     this.setValues(this.state.initialFValues);
    //     this.setErrors(this.state.initialErrors);
    // }

    addField = () => {
        let formStructure = [...this.state.formStructure];
        formStructure.push([])
        const values = [...this.state.values];
        const errors = [...this.state.errors];

        values.push(this.getDefaultValues({}))
        errors.push(this.getDefaultErrors())

        this.setState({ formStructure, values, errors })
    }

    render() {

        const values = this.state.values;
        const errors = this.state.errors;
        const formStructure = this.state.formStructure;
        const handleInputChange = this.handleInputChange;
        const resetForm = this.resetForm;


        const inputFields = formStructure.map((row, index) => {
            const fields = row.map((field, i) => {
                if (getType(field.datatype) === 'input') {
                    return (
                        <GridItem xs={12} sm={12} md={2}>
                            <Controls.Input
                                name={field.id}
                                label={field.labelText}
                                value={values[index]['conditions'][field.id]}
                                onChange={(e) => handleInputChange(e, index, 'conditions')}
                                error={errors[index]['conditions'][field.id]}
                                disabled={field.disabled}
                            />
                        </GridItem>
                    )
                } else if (getType(field.datatype) === 'checkbox') {
                    return (
                        <GridItem xs={12} sm={12} md={2}>
                            <Controls.Checkbox
                                name={field.id}
                                label={field.labelText}
                                value={values[index]['conditions'][field.id]}
                                onChange={(e) => handleInputChange(e, index, 'conditions')}
                                error={errors[index]['conditions'][field.id]}
                                disabled={field.disabled}
                            />
                        </GridItem>
                    )
                }
            });

            return (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Input
                            name="labelText"
                            label="Field Label"
                            value={values[index].labelText}
                            onChange={(e) => handleInputChange(e, index)}
                            error={errors[index].labelText}
                        // disabled={field[index].disabled}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Select
                            name="datatype"
                            label="Data Type"
                            options={this.props.datatypes}
                            value={values[index].datatype}
                            onChange={(e) => handleInputChange(e, index)}
                            error={errors[index].datatype}
                        // disabled={field[index].disabled}
                        />
                    </GridItem>
                    {fields}
                    <GridItem>
                        <Controls.Checkbox
                            name="required"
                            label="Required"
                            value={values[index].required}
                            onChange={(e) => handleInputChange(e, index)}
                            error={errors[index].required}
                        // disabled={field[index].disabled}
                        />
                    </GridItem>
                </GridContainer>

            )
        })

        return (
            <Card variant="outlined" >
                <CardContent>
                    <Form onSubmit={this.handleSubmit}>

                        {inputFields}
                        <GridContainer>


                            <GridItem xs={12} sm={12} md={6}>
                                <div>
                                    <Controls.Button
                                        type="submit"
                                        text="Submit" />
                                    {/* <Controls.Button
                                        text="Reset"
                                        color="default"
                                        onClick={this.resetForm} /> */}
                                    <Controls.Button
                                        text="Add Another Field"
                                        color="default"
                                        onClick={this.addField} />
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

export default connect(mapStateToProps, {
    saveForm
})(AddForm);


// TODO RESET FORM