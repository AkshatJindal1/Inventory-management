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

export class ProductLanding extends Component {
    componentWillMount() {
        // this.props.getAllProducts();
    }

    render() {
        return (
            <Fragment>
                <Card variant="outlined">
                    <CardContent>
                        <Fragment>
                            <form>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput id="productId" labelText="Product Id" />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput id="productName" labelText="Product Name" />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput id="description" labelText="Description" />
                                    </GridItem>
                                </GridContainer>
                            </form>
                        </Fragment>
                    </CardContent>
                    <CardActions>
                        <CustomButton
                            buttonType="send"
                        >Send
                        </CustomButton>

                    </CardActions>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProductLanding);
