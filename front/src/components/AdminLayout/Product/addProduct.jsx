import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CustomInput from "../../CustomInput";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CustomButton from "../../CustomButton";

export class ProductLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: {},
    };
  }

  componentWillMount() {
    // this.props.getAllProducts();
  }

  handleSubmit = (event) => {
    console.log(this.state.forms);
  };

  handleChange = (event) => {
    let forms = this.state.forms;
    forms[event.target.id] = event.target.value;
    this.setState({ forms });
  };

  render() {
    return (
      <Fragment>
        <Card variant="outlined">
          <form>
            <CardContent>
              <Fragment>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="productId"
                      labelText="Product Id"
                      value={this.state.forms.productId}
                      handleChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="productName"
                      labelText="Product Name"
                      value={this.state.forms.productName}
                      handleChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="description"
                      labelText="Description"
                      value={this.state.forms.description}
                      handleChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
              </Fragment>
            </CardContent>
            <CardActions>
              <CustomButton
                handleSubmit={this.handleSubmit}
                type="submit"
                buttonType="send"
              >
                Send
              </CustomButton>
            </CardActions>
          </form>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProductLanding);
