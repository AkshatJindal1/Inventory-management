import React, { Component, Fragment } from 'react'
import {
    checkCompanyAlreadyExists,
    getIndustryList,
    saveClientInfo,
} from '../../store/actions/profileAction'

import Card from '@material-ui/core/Card'
import { CardActions } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Controls from '../Controls/Controls'
import { Form } from '../Forms'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import LoginButton from './Login'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ValidateFields from '../AddForm/validate'
import { connect } from 'react-redux'

export class UserRegistration extends Component {
    constructor() {
        super()
        this.state = {
            industries: [],
            redirectTo: null,
            blankInitialValues: {
                companyName: '',
                industry: '',
            },
            values: {
                companyName: '',
                industry: '',
            },
            errorConditions: {
                companyName: {
                    datatype: 'text',
                    required: true,
                    conditions: {},
                },
                industry: {
                    datatype: 'select',
                    required: true,
                    conditions: {},
                },
            },
            errors: {},
        }
    }

    componentWillMount() {
        const { token } = this.props
        console.log('here 1')

        this.props.getIndustryList(token, (industryList) => {
            this.setState({
                industries: industryList.map((industry, key) => {
                    return {
                        id: industry,
                        disabled: false,
                        title: industry,
                    }
                }),
            })
        })
    }

    setErrors = (errors) => {
        this.setState({ errors })
    }

    validate = (fieldValues = this.state.values) => {
        let temp = { ...this.state.errors }
        const errorConditions = this.state.errorConditions
        console.log(errorConditions)
        for (const [key, value] of Object.entries(fieldValues)) {
            console.log(key)
            const errorCondition = errorConditions[key]

            if (value === '') {
                temp = {
                    ...temp,
                    ...ValidateFields.isRequired(errorCondition, key),
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

    setValues = (values) => {
        this.setState({ values })
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setValues({
            ...this.state.values,
            [name]: value,
        })
        this.validate({ [name]: value })
    }

    resetForm = () => {
        this.setValues(this.state.blankInitialValues)
        this.setErrors({})
    }

    onSuccess = () => {
        this.setState({
            redirectTo: <Redirect to={`/profile`} />,
        })
    }

    onError = () => {
        this.setState({
            redirectTo: 'Some Errors Exists',
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.validate()) {
            const values = { ...this.state.values }
            this.props.saveClientInfo(
                this.onSuccess,
                this.onError,
                values,
                this.props.token
            )
        }
    }

    render() {
        const { industries, values, errors } = this.state
        const handleInputChange = this.handleInputChange
        const resetForm = this.resetForm
        console.log(this.state)
        console.log('here 2')
        const inputFields = [
            <GridItem xs={12} sm={12} md={6}>
                <Controls.Input
                    name="companyName"
                    label="Company Name"
                    value={values['companyName']}
                    onChange={this.handleInputChange}
                    onBlur={this.handleFieldBlur}
                    error={errors['companyName']}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={6}>
                <Controls.Select
                    name="industry"
                    label="Industry"
                    value={values['industry']}
                    onChange={handleInputChange}
                    options={industries}
                    error={errors['industry']}
                />
            </GridItem>,
        ]
        return (
            <Card variant="outlined">
                <Form onSubmit={this.handleSubmit}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h5">
                            User Registration
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <GridContainer>{inputFields}</GridContainer>
                    </CardContent>
                    <CardActions>
                        <GridItem xs={12} sm={12} md={12}>
                            <Controls.Button type="submit" text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm}
                            />
                        </GridItem>
                    </CardActions>
                </Form>
                {this.state.redirectTo}
            </Card>
        )
    }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
    getIndustryList,
    checkCompanyAlreadyExists,
    saveClientInfo,
})(UserRegistration)
