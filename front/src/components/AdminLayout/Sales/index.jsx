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
import ProductSelect from './ProductSelect'

const validateOnChange = true

// TODO Render data values for option fields in data table

export class AddForm extends Component {
    validate = (fieldValues = this.state.values) => {}

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
        console.log(this.state.productValues)
        // this.save(this.onSuccess, this.onError)
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
        let customerValues = {}
        let productValues = [this.getNewProductRow()]
        let customerErrors = {}
        let productErrors = [{}]

        // Customer Form
        const customerFormStructure = [
            {
                name: 'name',
                label: 'Customer Name',
            },
            {
                name: 'phone',
                label: 'Phone Number',
            },
            {
                name: 'email',
                label: 'Email',
            },
        ]

        const rowCount = 1

        this.setState({
            customerValues,
            productValues,
            customerErrors,
            productErrors,
            rowCount,
            customerFormStructure,
        })
    }

    setCustomerValues = (customerValues) => {
        this.setState({ customerValues })
    }

    setProductValues = (productValues) => {
        this.setState({ productValues })
    }

    setErrors = (errors) => {
        this.setState({ errors })
    }

    handleCustomerInputChange = (e) => {
        const { name, value } = e.target
        this.setCustomerValues({
            ...this.state.values,
            [name]: value,
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
        console.log(option, index)

        let productValues = this.state.productValues
        productValues[index].quantity = 1
        productValues[index].unitCost = option.cost ? option.cost : 0
        productValues[index].totalCost = option.cost ? option.cost : 0
        productValues[index].product = option.productId

        this.setProductValues(productValues)
    }

    resetForm = () => {
        this.setValues({})
        this.setErrors({})
        this.setState({ redirectTo: '' })
    }

    getNewProductRow = () => {
        return {
            unitCost: 0,
            quantity: 0,
            totalCost: 0,
        }
    }

    addAnotherRow = () => {
        let productValues = this.state.productValues
        let productErrors = this.state.productErrors
        let rowCount = this.state.rowCount + 1

        productValues.push(this.getNewProductRow())
        productErrors.push({})

        this.setState({
            rowCount,
            productValues,
            productErrors,
        })
    }

    handleDeleteButton = (event, index) => {
        let productValues = this.state.productValues
        let productErrors = this.state.productErrors
        let rowCount = this.state.rowCount - 1

        productValues.splice(index, 1)
        productErrors.splice(index, 1)

        this.setState({ productValues, productErrors, rowCount })
    }

    render() {
        const customerFields = this.state.customerFormStructure.map(
            (row, index) => (
                <GridItem xs={12} sm={12} md={6}>
                    <Controls.Input
                        name={row.name}
                        label={row.label}
                        value={this.state.customerValues[row.name]}
                        onChange={(e) => this.handleCustomerInputChange(e)}
                        error={this.state.customerErrors[row.name]}
                    />
                </GridItem>
            )
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
                            id={'product'}
                            label={'Products'}
                            token={this.props.token}
                            value={this.state.productValues[i].product}
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
                        <GridContainer>{customerFields}</GridContainer>
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
                                    text="Save and Another"
                                    onClick={this.saveAndReset}
                                />
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

export default connect(mapStateToProps, {})(AddForm)
