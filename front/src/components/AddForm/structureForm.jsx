import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CustomInput from '../CustomInput';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomButton from '../CustomButton';
import datatypes from '../../demo/datatypes'

export class StructureForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: {},
            formFields: {},
            validateNow: false,
            errorSet: new Set(),
        };
    }

    componentWillMount() {
        const { formFields } = this.props;
        let datatypesMenu = []
        for (const [key, value] of Object.entries(datatypes)) {
            datatypesMenu.push(value)
        }
        this.setState({ formFields, datatypesMenu })
    }

    handleSubmit = (event) => {
        this.setState({ validateNow: true })
        console.log(this.state.errorSet)
        if (this.state.errorSet.size === 0) console.log("Calling API", this.state.forms)
        else console.log("Few Errors Exist")
    }

    changeErrorStatus = (add, id) => {
        let errorSet = this.state.errorSet;
        if (add) errorSet.add(id)
        else errorSet.delete(id)
        this.setState({ errorSet })
    }

    handleChange = (event) => {
        let forms = this.state.forms;
        console.log(event.target)
        let key = event.target.id;
        if (key === undefined) key = event.target.name
        console.log(key)
        forms[key] = event.target.value
    }

    getOption = (datatype, defaultOptions) => {

        let options = []
        if (datatypes[datatype].options) {
            options.push(datatypes[datatype].options.map((option, index) => {
                let oneOption = defaultOptions.find(opt => opt.id === option.id);
                let value = "";
                if (oneOption && oneOption.value !== undefined) {
                    value = oneOption.value;
                }
                return (
                    <GridItem key={index} xs={12} sm={12} md={2}>
                        <CustomInput
                            id={option.id}
                            labelText={option.labelText}
                            conditions={option.conditions}
                            value={value + ''}
                            handleChange={this.handleChange}
                            validateNow={this.state.validateNow}
                            changeErrorStatus={this.changeErrorStatus}
                        />
                    </GridItem>
                )
            }));
        }

        let oneOption = defaultOptions.find(opt => opt.id === 'required');
        let value = 1;
        if (oneOption && oneOption.value) {
            console.log(datatype, oneOption.value)
            value = oneOption.value;
        }

        options.push(
            <GridItem key="required" xs={12} sm={12} md={1}>
                <CustomInput
                    id={'required'}
                    labelText="Required"
                    value={value}
                    handleChange={this.handleChange}
                    validateNow={this.state.validateNow}
                    changeErrorStatus={this.changeErrorStatus}
                    menuitems={[
                        {
                            id: 1,
                            labelText: 'Required'
                        },
                        {
                            id: 2,
                            labelText: "Not Required"
                        }
                    ]}
                />
            </GridItem>
        )
        return options;
    }

    render() {

        const forms = this.state.formFields.map((form, index) => {

            const options = this.getOption(form.datatype, form.options)

            return (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            id="name"
                            labelText="Filed Name"
                            value={form.labelText}
                            required={true}
                            handleChange={this.handleChange}
                            validateNow={this.state.validateNow}
                            changeErrorStatus={this.changeErrorStatus}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            id="datatype"
                            labelText="Data Type"
                            value={form.datatype}
                            required={true}
                            handleChange={this.handleChange}
                            validateNow={this.state.validateNow}
                            changeErrorStatus={this.changeErrorStatus}
                            menuitems={this.state.datatypesMenu}
                        />
                    </GridItem>
                    {options}

                </GridContainer>)
        })

        return (
            <Card variant="outlined">
                <form>
                    <CardContent>
                        <Fragment>

                            {forms}


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

export default connect(mapStateToProps, {})(StructureForm);
