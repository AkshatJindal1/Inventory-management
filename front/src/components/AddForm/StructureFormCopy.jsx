import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from "react-redux";

import Controls from "../controls/Controls";
import { Form } from '../Forms';
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

import ValidateFields from './validate'
import GetFields from './getFields'

export class AddForm extends Component {
    validate = (fieldValues = this.state.values) => {

        let temp = { ...this.state.errors }

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

            if (value.fieldName === '') {
                thisTemp = { ...thisTemp, ...ValidateFields.isRequired(errorConditionRequired, 'fieldName') }
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

        this.setErrors({
            ...temp
        })


        for (const [key, value] of Object.entries(temp)) {
            if (value.fieldName || value.datatype || value.conditions.min || value.conditions.max) return false
        }
        return true;
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.validate()) {
            this.resetForm()
            let res = Object.values(this.state.values);
            console.log("Calling API", res)
        }
        else {
            console.log("Errors Exists")
        }
    }

    getDeafultValues = () => {
        return {
            fieldName: "",
            datatype: "",
            required: false,
            conditions: {}
        }
    }

    getDefaultErrors = () => {
        return {
            conditions: {}
        }
    }

    componentWillMount() {
        const matrix = this.props.formFields;
        let values = {}
        let initialFValues = {}
        let errors = {}

        const structure = matrix.map((field, index) => {
            const row = [];

            values[index] = this.getDeafultValues()
            errors[index] = this.getDefaultErrors()
            return row;
        })

        initialFValues = { ...values }

        this.setState({ values, errors, formStructure: structure, initialFValues, initialErrors: errors })
    }

    setValues = (values) => {
        this.setState({ values }, () => {
            console.log(this.state)
        });
    }

    setErrors = (errors) => {
        this.setState({ errors });
    }

    setOptionalFields = (index, value) => {
        const formStructure = this.state.formStructure;
        if (value === 'number') {
            formStructure[index] = GetFields.number
        } else if (value === 'text') {
            formStructure[index] = GetFields.text
        }
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
        let formStructure = this.state.formStructure;
        formStructure.push([])
        // const values = this.state.values;
        // values.push(this.getDeafultValues())
        // errors.push(this.getDeafultValues())
        // this.setState({ formStructure })
    }

    render() {

        const values = this.state.values;
        const errors = this.state.errors;
        const formStructure = this.state.formStructure;
        const handleInputChange = this.handleInputChange;
        const resetForm = this.resetForm;


        const inputFields = formStructure.map((row, index) => {
            const fields = row.map((field, i) => {
                if (field.type === 'input') {
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
                } else if (field.type === 'checkbox') {
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
                            name="fieldName"
                            label="Field Label"
                            value={values[index].fieldName}
                            onChange={(e) => handleInputChange(e, index)}
                            error={errors[index].fieldName}
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

export default connect(mapStateToProps, {})(AddForm);


// TODO RESET FORM