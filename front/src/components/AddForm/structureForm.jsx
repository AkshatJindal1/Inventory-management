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
            formFields: {},
            validateNow: false,
            errorSet: new Map(),
            refList: []
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
        console.log(this.state.formFields)
        if (this.state.errorSet.size === 0) {
            this.props.updateUrl(this.state.formFields);
        }
        else console.log("Few Errors Exist")
    }

    addToMap(id) {
        let errorSet = this.state.errorSet;
        let count = errorSet.has(id) ? errorSet.get(id) : 0;
        count = count + 1;
        errorSet.set(id, count);
        this.setState({ errorSet })
    }

    removeFromMap(id) {
        let errorSet = this.state.errorSet;
        let count = errorSet.has(id) ? errorSet.get(id) : 1;
        count = count - 1;
        if (count === 0) errorSet.delete(id);
        else errorSet.set(id, count);
        this.setState({ errorSet })
    }

    changeErrorStatus = (add, id) => {
        if (add) this.addToMap(id)
        else this.removeFromMap(id)
    }

    handleChange = (event, index, root) => {
        let formFields = this.state.formFields;
        let key = event.target.id;
        console.log(key, event.target.id, event.target.value, index, root)
        if (key === undefined) key = event.target.name
        if (key === 'datatype') formFields[index].conditions = {}
        if (formFields[index].conditions === undefined) formFields[index].conditions = {}
        if (root === 'conditions') formFields[index].conditions[key] = event.target.value;
        if (root === 'root') {
            if (key === 'required') formFields[index][key] = event.target.value === 1 ? true : false
            else formFields[index][key] = event.target.value;
        }
        this.setState({ formFields }, () => console.log(this.state.formFields))
    }

    addRow = () => {
        let formFields = this.state.formFields;
        formFields.push({
            labelText: '',
            disabled: false,
            datatype: '',
            required: false,
            conditions: {
            }
        })
        this.setState({ formFields })
    }

    getNewRef = () => {

        let refList = this.state.refList

        const ref = React.createRef();
        refList.push(ref);

        this.setState({ refList })
    }

    getOption = (datatype, defaultCondition, required, formIndex) => {

        let options = []

        options.push(
            <GridItem key="required" xs={12} sm={12} md={1}>
                <CustomInput
                    id='required'
                    labelText="Required"
                    value={required ? 1 : 2}
                    required
                    handleChange={(event) => this.handleChange(event, formIndex, "root")}
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

        if (datatypes[datatype] !== undefined && datatypes[datatype].options) {
            options.push(datatypes[datatype].options.map((option, index) => {

                let value = defaultCondition !== undefined && defaultCondition[option.id] !== undefined ? defaultCondition[option.id] : '';

                return (
                    <GridItem key={index} xs={12} sm={12} md={2}>
                        <CustomInput
                            id={option.id}
                            datatype={option.datatype}
                            labelText={option.labelText}
                            condition={{
                                errorText: datatypes[option.datatype].errorText
                            }}
                            value={value + ''}
                            handleChange={(event) => this.handleChange(event, formIndex, "conditions")}
                            validateNow={this.state.validateNow}
                            changeErrorStatus={this.changeErrorStatus}
                        />
                    </GridItem>
                )
            }));
        }

        return options;
    }

    render() {

        const forms = this.state.formFields.map((field, index) => {

            const options = this.getOption(field.datatype, field.conditions, field.required, index)

            return (
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>

                        {/* TODO add id, eg prodId , if new */}

                        <CustomInput
                            id="labelText"
                            // ref={ref1}
                            labelText="Field Name"
                            value={field.labelText}
                            datatype="text"
                            required={true}
                            disabled={field.disabled}
                            handleChange={(event) => this.handleChange(event, index, "root")}
                            validateNow={this.state.validateNow}
                            changeErrorStatus={this.changeErrorStatus}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <CustomInput
                            id="datatype"
                            // ref={ref2}
                            labelText="Data Type"
                            value={field.datatype}
                            required={true}
                            disabled={field.disabled}
                            handleChange={(event) => this.handleChange(event, index, "root")}
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
                            handleSubmit={this.addRow}
                            buttonType="add"
                        >
                            Add Another Field
                        </CustomButton>

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
