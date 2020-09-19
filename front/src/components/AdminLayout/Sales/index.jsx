import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import { CardActions } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import { Redirect } from 'react-router'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

import Controls from '../../Controls/Controls'
import { Form } from '../../Forms'
import GridContainer from '../../Grid/GridContainer'
import GridItem from '../../Grid/GridItem'
import ProductSelect from './auto'
import Autocomplete from './Autocomplete'

import { saveSale } from '../../../store/actions/saleAction'

const validateOnChange = true

// TODO Render data values for option fields in data table

export class AddForm extends Component {
    validate = (fieldValues = this.state.values) => {}

    onSuccess = () => {
        this.resetForm()
        this.setState({
            redirectTo: 'Successfuly saved',
        })
    }

    onError = () => {
        this.setState({
            redirectTo: 'Some Errors Exists',
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            customer: this.state.customerValues,
            sale: this.state.productValues,
        }
        console.log(data)
        this.props.saveSale(
            this.onSuccess,
            this.onError,
            data,
            this.props.token
        )
    }

    saveAndReset = () => {
        this.save(this.resetForm, this.onError)
        this.setState({ uid: '' })
    }

    save = (onSuccess, onError) => {
        if (this.validate()) {
            this.props.saveProduct(
                onSuccess,
                onError,
                this.state.values,
                this.props.option,
                this.props.token
            )
        }
    }

    handleCancel = () => {
        this.setState({ redirectTo: <Redirect to={'/sale'} /> })
    }

    componentWillMount() {
        // Store the output json, and default values
        this.resetForm()
    }

    setCustomerValues = (customerValues) => {
        this.setState({ customerValues }, () => {})
    }

    setProductValues = (productValues) => {
        this.setState({ productValues })
    }

    setProductValueObject = (productValueObject) => {
        this.setState({ productValueObject })
    }

    handleCustomerInputChange = (e) => {
        const { name, value } = e.target
        this.setCustomerValues({
            ...this.state.customerValues,
            [name]: value,
        })
    }

    handleCustomerOptionChange = (customer) => {
        this.setCustomerValues({
            ...this.state.customerValues,
            ...customer,
        })
    }

    handleProductInputChange = (e, index) => {
        const { name, value } = e.target

        let productValues = this.state.productValues
        productValues[index][name] = value

        this.setProductValues(productValues)
    }

    handleProductUnitCostChange = (e, index) => {
        const { name, value } = e.target
        let productValues = this.state.productValues
        productValues[index].unitCost = value
        let totalCost = value * productValues[index].quantity
        if (!totalCost) totalCost = 0
        productValues[index].totalCost = totalCost
        this.setProductValues(productValues)
    }

    handleProductQuantityChange = (e, index) => {
        const { name, value } = e.target
        let productValues = this.state.productValues
        productValues[index].quantity = value
        let totalCost = value * productValues[index].unitCost
        if (!totalCost) totalCost = 0
        productValues[index].totalCost = totalCost
        this.setProductValues(productValues)
    }

    handleProductOptionChange = (option, index) => {
        let productValueObject = this.state.productValueObject
        let productValues = this.state.productValues

        productValueObject[index] = option

        if (option)
            productValues[index] = {
                ...option,
                unitCost: option.unitCost ? option.unitCost : 0,
                totalCost: option.unitCost ? option.unitCost : 0,
                quantity: 1,
            }
        else {
            productValues[index] = this.getNewProductRow()
        }

        this.setProductValues(productValues)
        this.setProductValueObject(productValueObject)
    }

    resetForm = () => {
        let customerValues = {
            name: '',
            email: '',
            phone: '',
        }
        let productValues = [this.getNewProductRow()]
        let customerErrors = {}
        let productErrors = [{}]
        let productValueObject = [null]

        const rowCount = 1

        this.setState({
            customerValues,
            productValues,
            customerErrors,
            productErrors,
            rowCount,
            productValueObject,
        })
    }

    getNewProductRow = () => {
        return {
            unitCost: '',
            quantity: '',
            totalCost: '',
        }
    }

    addAnotherRow = () => {
        let productValues = this.state.productValues
        let productErrors = this.state.productErrors
        let productValueObject = this.state.productValueObject
        let rowCount = this.state.rowCount + 1

        productValues.push(this.getNewProductRow())
        productErrors.push({})
        productValueObject.push(null)

        this.setState({
            rowCount,
            productValues,
            productErrors,
            productValueObject,
        })
    }

    handleDeleteButton = (event, index) => {
        let productValues = this.state.productValues
        let productErrors = this.state.productErrors
        let productValueObject = this.state.productValueObject
        let rowCount = this.state.rowCount - 1

        productValues.splice(index, 1)
        productErrors.splice(index, 1)
        productValueObject.splice(index, 1)

        this.setState({
            productValues,
            productErrors,
            rowCount,
            productValueObject,
        })
    }

    render() {
        console.log(this.state.productValueObject)
        const customerFields = (
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Autocomplete
                        name={'name'}
                        label={'Customer Name'}
                        token={this.props.token}
                        optionSelected={(customer) =>
                            this.handleCustomerOptionChange(customer)
                        }
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Controls.Input
                        name={'phone'}
                        label={'Phone Number'}
                        value={this.state.customerValues.phone}
                        onChange={(e) => this.handleCustomerInputChange(e)}
                        error={this.state.customerErrors.phone}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Controls.Input
                        name={'email'}
                        label={'Email Id'}
                        value={this.state.customerValues.email}
                        onChange={(e) => this.handleCustomerInputChange(e)}
                        error={this.state.customerErrors.email}
                    />
                </GridItem>
            </GridContainer>
        )

        let productsFields = []
        Array.from(Array(this.state.rowCount)).forEach((x, i) => {
            productsFields.push(
                <GridContainer>
                    <Controls.Button
                        text="Delete"
                        variant="outlined"
                        size="medium"
                        color="secondary"
                        onClick={(e) => this.handleDeleteButton(e, i)}
                    />
                    <GridItem xs={12} sm={12} md={4}>
                        <ProductSelect
                            key={i}
                            id={'product'}
                            label={'Products'}
                            token={this.props.token}
                            value={this.state.productValueObject[i]}
                            optionSelected={(option) =>
                                this.handleProductOptionChange(option, i)
                            }
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Input
                            type="number"
                            name={'quantity'}
                            label={'Quantity'}
                            value={this.state.productValues[i].quantity}
                            onChange={(e) =>
                                this.handleProductQuantityChange(e, i)
                            }
                            error={this.state.productErrors[i].quantity}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Input
                            name={'unitCost'}
                            type="number"
                            label={'Unit Cost'}
                            value={this.state.productValues[i].unitCost}
                            onChange={(e) =>
                                this.handleProductUnitCostChange(e, i)
                            }
                            error={this.state.productErrors[i].unitCost}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <Controls.Input
                            name={'totalCost'}
                            type="number"
                            label={'Total Cost'}
                            value={this.state.productValues[i].totalCost}
                            onChange={(e) =>
                                this.handleProductInputChange(e, i)
                            }
                            error={this.state.productErrors[i].totalCost}
                        />
                    </GridItem>
                </GridContainer>
            )
        })

        return (
            <Card variant="outlined">
                <Form onSubmit={this.handleSubmit}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h5">
                            {'Add New Sale'}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        {customerFields}
                        <CardContent>{productsFields}</CardContent>
                        <GridContainer>
                            <GridItem>
                                <Controls.Button
                                    text="Add Row"
                                    color="default"
                                    onClick={this.addAnotherRow}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardContent>

                    <CardActions>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Controls.Button type="submit" text="Submit" />
                                <Controls.Button
                                    text="Reset"
                                    color="default"
                                    onClick={this.resetForm}
                                />
                                <Controls.Button
                                    text="Cancel"
                                    color="default"
                                    onClick={this.handleCancel}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardActions>
                </Form>
                {this.state.redirectTo}
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
    saveSale,
})(AddForm)
