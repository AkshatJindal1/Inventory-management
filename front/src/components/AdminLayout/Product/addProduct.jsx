import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CustomInput from '../../CustomInput';
import GridContainer from '../../Grid/GridContainer';
import GridItem from '../../Grid/GridItem';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomButton from "../../CustomButton";
import formFields from './config';

export class ProductLanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: {}
        };
    }

    componentWillMount() {
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

    render() {

        const fields = this.state.formFields.map((field, index) => {
            return (
                <GridItem key={index} xs={12} sm={12} md={6}>
                    <CustomInput
                        conditions={field.conditions}
                        id={field.id}
                        labelText={field.labelText}
                        value={this.state.forms[field.productId]}
                        disabled={field.disabled}
                        required={field.required}
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
