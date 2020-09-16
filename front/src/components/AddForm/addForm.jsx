import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import { CardActions } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Controls from '../Controls/Controls'
import { Form } from '../Forms'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import { Redirect } from 'react-router'
import Typography from '@material-ui/core/Typography'
import ValidateFields from './validate'
import { connect } from 'react-redux'
import getType from './typeDatatypeMap'
import { saveProduct } from '../../store/actions/productAction'
import { TimerSharp } from '@material-ui/icons'

const validateOnChange = true

// TODO Render data values for option fields in data table

export class AddForm extends Component {
    validate = (fieldValues = this.state.values) => {
        let temp = { ...this.state.errors }
        const errorConditions = this.state.errorCondition
        console.log(errorConditions)
        for (const [key, value] of Object.entries(fieldValues)) {
            console.log(key)
            const errorCondition = errorConditions[key]

            if (value === '') {
                temp = {
                    ...temp,
                    ...ValidateFields.isRequired(errorCondition, key),
                }
            } else if (errorCondition.datatype === 'number') {
                temp = {
                    ...temp,
                    ...ValidateFields.numberValidation(
                        value,
                        errorCondition,
                        key
                    ),
                }
            } else if (errorCondition.datatype === 'email') {
                temp = {
                    ...temp,
                    ...ValidateFields.emailValidation(
                        value,
                        errorCondition,
                        key
                    ),
                }
            } else if (errorCondition.datatype === 'text') {
                temp = {
                    ...temp,
                    ...ValidateFields.textValidation(
                        value,
                        errorCondition,
                        key
                    ),
                }
            } else temp[key] = ''
        }

        this.setErrors({
            ...temp,
        })

        if (fieldValues === this.state.values)
            return Object.values(temp).every((x) => x === '')
    }

    onSuccess = () => {
        this.resetForm()
        console.log(`About to Redirect to ${this.props.redirectTo}`)
        this.setState({
            redirectTo: <Redirect to={this.props.redirectTo} />,
        })
    }

    onError = () => {
        this.setState({
            redirectTo: 'Some Errors Exists',
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.save(this.onSuccess, this.onError)
    }

    saveAndReset = () => {
        this.save(this.resetForm, this.onError)
        this.setState({ uid: '' })
    }

    save = (onSuccess, onError) => {
        if (this.validate()) {
            const values = { ...this.state.values }

            // Set uid
            values.uid = this.state.uid
            values.formId = this.props.formId

            this.props.saveProduct(
                onSuccess,
                onError,
                values,
                this.props.option,
                this.props.token
            )
        }
    }

    handleCancel = () => {
        this.setState({ redirectTo: <Redirect to={this.props.redirectTo} /> })
    }

    componentWillMount() {
        const uid =
            this.props.initialFValues != null
                ? this.props.initialFValues.uid
                : ''

        const initialFValues = this.props.initialFValues
            ? this.props.initialFValues
            : []
        const formStructure = this.props.formStructure

        let blankInitialValues = {}

        // Store the output json, and default values
        let values = {}

        // Stores Conditions for errors
        let errorCondition = {}

        // Store the Structure and Default Values for the Forms
        let structure = formStructure.map((field) => {
            const value =
                initialFValues[field.id] == null ? '' : initialFValues[field.id]

            field.value = value
            values[field.id] = field.value
            blankInitialValues[field.id] = ''

            errorCondition[field.id] = {
                datatype: field.datatype,
                required: field.required ? true : false,
                conditions: field.conditions ? field.conditions : {},
            }

            if (field.datatype === 'boolean') {
                field.value = field.value ? field.value : false
                values[field.id] = field.value
                blankInitialValues[field.id] = false
            }

            return field
        })

        this.setState({
            values,
            errors: {},
            formStructure: structure,
            blankInitialValues,
            errorCondition,
            uid,
        })
    }

    setValues = (values) => {
        this.setState({ values })
    }

    setErrors = (errors) => {
        this.setState({ errors })
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setValues({
            ...this.state.values,
            [name]: value,
        })
        if (validateOnChange) this.validate({ [name]: value })
    }

    resetForm = () => {
        this.setValues(this.state.blankInitialValues)
        this.setErrors({})
    }

    render() {
        const values = this.state.values
        const errors = this.state.errors
        const formStructure = this.state.formStructure
        const handleInputChange = this.handleInputChange
        const resetForm = this.resetForm
        const saveAndReset = this.saveAndReset

        const inputFields = formStructure.map((field, index) => {
            if (getType(field.datatype) === 'input') {
                return (
                    <GridItem xs={12} sm={12} md={6}>
                        <Controls.Input
                            name={field.id}
                            label={field.labelText}
                            value={values[field.id]}
                            onChange={handleInputChange}
                            error={errors[field.id]}
                            // disabled={field.disabled}
                        />
                    </GridItem>
                )
            } else if (getType(field.datatype) === 'checkbox') {
                return (
                    <GridItem xs={12} sm={12} md={6}>
                        <Controls.Checkbox
                            name={field.id}
                            label={field.labelText}
                            value={values[field.id] == '' ? false : true}
                            onChange={handleInputChange}
                            error={errors[field.id]}
                            // disabled={field.disabled}
                        />
                    </GridItem>
                )
            } else if (getType(field.datatype) === 'select') {
                return (
                    <GridItem xs={12} sm={12} md={6}>
                        <Controls.Select
                            name={field.id}
                            label={field.labelText}
                            value={values[field.id]}
                            onChange={handleInputChange}
                            options={field.menuitems || []}
                            error={errors[field.id]}
                            // disabled={field.disabled}
                        />
                    </GridItem>
                )
            }
        })

        return (
            <Card variant="outlined">
                <Form onSubmit={this.handleSubmit}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h5">
                            {this.props.formName}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <GridContainer>{inputFields}</GridContainer>
                    </CardContent>
                    <CardActions>
                        <GridItem xs={12} sm={12} md={12}>
                            <Controls.Button type="submit" text="Submit" />
                            <Controls.Button
                                text="Save and Another"
                                onClick={saveAndReset}
                            />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm}
                            />
                            <Controls.Button
                                text="Cancel"
                                color="default"
                                onClick={this.handleCancel}
                            />
                        </GridItem>
                    </CardActions>
                </Form>
                {this.state.redirectTo}
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    saveProduct,
})(AddForm)
