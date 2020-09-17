import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { connect } from 'react-redux'

import Controls from '../Controls/Controls'
import { Form } from '../Forms'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

import ValidateFields from './validate'
import GetFields from './getFields'
import getType from './typeDatatypeMap'
import { Redirect } from 'react-router'

import { saveForm } from '../../store/actions/formAction'
import { CardActions, CardHeader } from '@material-ui/core'

export class StructureForm extends Component {
    validate = (fieldValues = this.state.values) => {
        let temp = this.state.errors

        const errorConditionRequired = {
            required: true,
            conditions: {},
        }

        const errorConditionNotRequired = {
            required: false,
            conditions: {},
        }

        for (const [key, value] of Object.entries(fieldValues)) {
            let thisTemp = {
                conditions: {},
            }

            if (value.labelText === '') {
                thisTemp = {
                    ...thisTemp,
                    ...ValidateFields.isRequired(
                        errorConditionRequired,
                        'labelText'
                    ),
                }
            }

            if (value.datatype === '') {
                thisTemp = {
                    ...thisTemp,
                    ...ValidateFields.isRequired(
                        errorConditionRequired,
                        'datatype'
                    ),
                }
            }

            if (value.conditions.min != null) {
                thisTemp = {
                    ...thisTemp,
                    conditions: {
                        ...thisTemp.conditions,
                        ...ValidateFields.numberValidation(
                            value.conditions.min,
                            errorConditionNotRequired,
                            'min'
                        ),
                    },
                }
            }

            if (value.conditions.max != null) {
                thisTemp = {
                    ...thisTemp,
                    conditions: {
                        ...thisTemp.conditions,
                        ...ValidateFields.numberValidation(
                            value.conditions.max,
                            errorConditionNotRequired,
                            'max'
                        ),
                    },
                }
            }

            temp[key] = thisTemp
        }

        this.setErrors(temp)

        for (const [key, value] of Object.entries(temp)) {
            if (
                value.labelText ||
                value.datatype ||
                value.conditions.min ||
                value.conditions.max
            )
                return false
        }
        if (
            this.state.headingDetails.value == '' ||
            this.state.headingDetails.value == null
        ) {
            this.setHeadingError(true)
            return false
        }
        return true
    }

    handleSubmit = (e) => {
        console.log(this.props.option)
        e.preventDefault()
        if (this.validate()) {
            let res = Object.values(this.state.values)
            console.log('Calling API', res)
            this.props.saveForm(
                () => {
                    console.log(`About to Redirect to ${this.props.redirectTo}`)
                    this.setState({
                        redirectTo: <Redirect to={this.props.redirectTo} />,
                    })
                },
                (err) => {
                    console.log(err)
                    this.setState({
                        redirectTo: 'Some Errors Exists',
                    })
                },
                res,
                this.state.headingDetails.value,
                this.props.formId,
                this.props.option,
                this.props.token
            )
        } else {
            console.log('Errors Exists')
        }
    }

    handleCancel = () => {
        this.setState({ redirectTo: <Redirect to={this.props.redirectTo} /> })
    }

    getDefaultValues = ({
        id = '',
        labelText = '',
        datatype = '',
        required = false,
        disabled = false,
        conditions = { min: '', max: '', errorText: '' },
    }) => {
        return {
            id: id,
            labelText: labelText,
            datatype: datatype,
            required: required,
            conditions: conditions,
            disabled: disabled,
        }
    }

    getDefaultErrors = () => {
        return {
            conditions: {},
        }
    }

    componentWillMount() {
        const matrix = this.props.formFields
        let values = []
        let errors = []
        let disabled = []

        const headingDetails = {
            id: 'formName',
            label: 'Form Name',
            value: this.props.formName,
            error: '',
        }

        const structure = matrix.map((field, index) => {
            let row = []
            values[index] = this.getDefaultValues(field)
            if (values[index].datatype == 'number') row = GetFields.number
            else if (values[index].datatype == 'text') row = GetFields.text
            else row = []

            errors[index] = this.getDefaultErrors()
            disabled[index] = field.disabled

            return row
        })

        const datatypes = []
        for (const [key, value] of Object.entries(this.props.datatypes)) {
            datatypes.push({
                id: '',
                title: key,
                disabled: true,
            })
            datatypes.push(
                ...value.map((v, index) => {
                    return { ...v, disabled: false }
                })
            )
        }
        this.setState({
            values,
            errors,
            formStructure: structure,
            disabled,
            headingDetails,
            datatypes,
        })
    }

    setValues = (values) => {
        this.setState({ values })
    }

    setErrors = (errors) => {
        this.setState({ errors })
    }

    setHeadingError = (isError) => {
        const headingDetails = this.state.headingDetails
        headingDetails.error = isError ? 'Form name cannot be empty.' : ''
        this.setState({ headingDetails })
    }

    setHeadingValue = (value) => {
        const headingDetails = this.state.headingDetails
        headingDetails.value = value
        this.setState({ headingDetails })
    }

    setOptionalFields = (index, value) => {
        const formStructure = [...this.state.formStructure]
        if (value === 'number') {
            formStructure[index] = GetFields.number
        } else if (value === 'text') {
            formStructure[index] = GetFields.text
        } else formStructure[index] = []
        this.setState({ formStructure })
    }

    handleInputChange = (e, index, root = 'root') => {
        const { name, value } = e.target
        const values = this.state.values

        if (root === 'root') values[index][name] = value
        else values[index][root][name] = value

        this.setValues(values)
        if (name === 'datatype') this.setOptionalFields(index, value)
    }

    handleHeadingChange = (e) => {
        const { name, value } = e.target
        this.setHeadingValue(value)
        this.setHeadingError(value == null || value == '')
    }

    addField = () => {
        let formStructure = [...this.state.formStructure]
        formStructure.push([])
        const values = [...this.state.values]
        const errors = [...this.state.errors]

        values.push(this.getDefaultValues({}))
        errors.push(this.getDefaultErrors())

        this.setState({ formStructure, values, errors })
    }

    handleDeleteButton = (event, index) => {
        console.log(index, 'BUtton Clicked')
        const values = [...this.state.values]
        const errors = [...this.state.errors]
        const disabled = [...this.state.disabled]
        const formStructure = [...this.state.formStructure]

        console.log(values, errors, disabled, formStructure)

        values.splice(index, 1)
        errors.splice(index, 1)
        disabled.splice(index, 1)
        formStructure.splice(index, 1)

        this.setState({ values, errors, disabled, formStructure })
    }

    render() {
        const values = this.state.values
        const errors = this.state.errors
        const disabled = this.state.disabled
        const headingDetails = this.state.headingDetails
        const formStructure = this.state.formStructure
        const handleInputChange = this.handleInputChange
        const handleHeadingChange = this.handleHeadingChange
        const handleDeleteButton = this.handleDeleteButton
        const resetForm = this.resetForm

        const inputFields = formStructure.map((row, index) => {
            const fields = row.map((field, i) => {
                if (getType(field.datatype) === 'input') {
                    return (
                        <GridItem xs={12} sm={12} md={2}>
                            <Controls.Input
                                name={field.id}
                                label={field.labelText}
                                value={values[index]['conditions'][field.id]}
                                onChange={(e) =>
                                    handleInputChange(e, index, 'conditions')
                                }
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
                                onChange={(e) =>
                                    handleInputChange(e, index, 'conditions')
                                }
                                error={errors[index]['conditions'][field.id]}
                                disabled={field.disabled}
                            />
                        </GridItem>
                    )
                }
            })

            return (
                <GridContainer>
                    {/* <GridItem> */}
                    <Controls.Button
                        text="Delete"
                        variant="outlined"
                        size="medium"
                        disabled={disabled[index]}
                        color="secondary"
                        onClick={(e) => handleDeleteButton(e, index)}
                    />
                    {/* </GridItem> */}
                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Input
                            name="labelText"
                            label="Field Label"
                            value={values[index].labelText}
                            onChange={(e) => handleInputChange(e, index)}
                            error={errors[index].labelText}
                            disabled={disabled[index]}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Select
                            name="datatype"
                            label="Data Type"
                            options={this.state.datatypes}
                            value={values[index].datatype}
                            onChange={(e) => handleInputChange(e, index)}
                            error={errors[index].datatype}
                            disabled={disabled[index]}
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
                            disabled={
                                this.props.option === 'options'
                                    ? [0].includes(index)
                                    : [0, 1].includes(index)
                            } // Disabling 1st two field in case of option, 2 in case of product
                        />
                    </GridItem>
                </GridContainer>
            )
        })

        return (
            <Card variant="outlined">
                <Form onSubmit={this.handleSubmit}>
                    <CardContent>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <Controls.Input
                                    name={headingDetails.id}
                                    label={headingDetails.label}
                                    value={headingDetails.value}
                                    onChange={(e) => handleHeadingChange(e)}
                                    error={headingDetails.error}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardContent>
                    <CardContent>{inputFields}</CardContent>
                    <CardActions>
                        <div>
                            <Controls.Button type="submit" text="Submit" />
                            <Controls.Button
                                text="Add Another Field"
                                color="default"
                                onClick={this.addField}
                            />
                            <Controls.Button
                                text="Cancel"
                                color="default"
                                onClick={this.handleCancel}
                            />
                        </div>
                    </CardActions>
                </Form>
                {this.state.redirectTo}
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    saveForm,
})(StructureForm)

// TODO RESET FORM
