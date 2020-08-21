import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CustomInput from '../../CustomInput';
import GridContainer from '../../Grid/GridContainer';
import GridItem from '../../Grid/GridItem';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CustomButton from "../../CustomButton";
import validator from 'validator';

export class ProductLanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: {
                productId: "",
                productName: "",
                description: "",
                inStock: ""
            }
        };
    }

    componentWillMount() {
        let formFields = [
            {
                id: 'productId',
                labelText: 'Product Id',
                helperText: 'Value Should be between 10 and 100 and Integer',
                error: false,
                disabled: false,
                required: true,
                condition: {
                    type: "integer",
                    min: 10,
                    max: 100
                }
            },
            {
                id: 'productName',
                labelText: 'Product Name',
                helperText: 'Product Name cannot be empty',
                disabled: false,
                required: true,
                error: false
            },
            {
                id: 'email',
                labelText: 'Email',
                helperText: 'Not a valid email id',
                disabled: false,
                required: true,
                error: false,
                condition: {
                    type: 'email'
                }
            },
            {
                id: 'inStock',
                labelText: 'In Stock',
                helperText: '',
                disabled: false,
                error: false,
                condition: {
                    type: "float",
                    min: 10,
                    max: 100
                }
            },
            {
                id: 'description',
                labelText: 'Description',
                helperText: 'Description',
                error: false,
                required: false,
                disabled: true,
            }
        ];
        this.setState({ formFields })
    }

    handleSubmit = (event) => {
        console.log(this.state.forms)
    }

    handleChange = (event) => {
        let forms = this.state.forms;
        forms[event.target.id] = event.target.value
        this.setState({ forms })
    }

    setErrorOn = (index) => {
        let formFields = this.state.formFields;
        formFields[index].error = true;
        this.setState({ formFields })
    }

    unsetErrorOn = (index) => {
        let formFields = this.state.formFields;
        formFields[index].error = false;
        this.setState({ formFields })
    }

    validateField = (event, index) => {
        const value = event.target.value;
        const formField = this.state.formFields[index];
        if (validator.isEmpty(value)) {
            if (formField.required) this.setErrorOn(index);
            else this.unsetErrorOn(index);
            return
        }
        if (formField.condition !== undefined) {
            const condition = formField.condition
            if (condition.type === 'integer') {
                let minMaxCondition = {};
                if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
                if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
                if (validator.isInt(value, { ...minMaxCondition })) this.unsetErrorOn(index)
                else this.setErrorOn(index)
            }
            else if (condition.type === 'float') {
                let minMaxCondition = {};
                if (condition.min) minMaxCondition = { ...minMaxCondition, min: condition.min }
                if (condition.max) minMaxCondition = { ...minMaxCondition, max: condition.max }
                if (validator.isFloat(value, { ...minMaxCondition })) this.unsetErrorOn(index)
                else this.setErrorOn(index)
            }
            else if (condition.type === 'email') {
                if (validator.isEmail(value)) this.unsetErrorOn(index);
                else this.setErrorOn(index)
            }
        }
    }

    render() {

        const fields = this.state.formFields.map((field, index) => {
            return (
                <GridItem key={index} xs={12} sm={12} md={6}>
                    <CustomInput
                        index={index}
                        id={field.id}
                        labelText={field.labelText}
                        value={this.state.forms[field.productId]}
                        helperText={field.helperText}
                        error={field.error}
                        disabled={field.disabled}
                        required={field.required}
                        validateField={this.validateField}
                        handleChange={this.handleChange}
                    />
                </GridItem>
            )
        });



        return (
            <Card variant="outlined">
                <form>
                    <CardContent>
                        <Fragment>
                            <GridContainer>
                                {fields}
                            </GridContainer>
                        </Fragment>
                    </CardContent>
                    <CardActions>
                        <CustomButton
                            handleSubmit={this.handleSubmit}
                            type="submit"
                            buttonType="send"
                        >Send
                        </CustomButton>
                    </CardActions>
                </form>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProductLanding);
