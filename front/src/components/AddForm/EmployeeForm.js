import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../AddForm/useForm';
import * as employeeService from '../../demo/employeeService';
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

export default function AdEmployeeFormdForm(props) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            employeeService.insertEmployee(values)
            resetForm()
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(props.initialFValues, true, validate);
    return (
        <Card variant="outlined" >
            <CardContent>
                <Form onSubmit={handleSubmit}>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.Input
                                name="fullName"
                                label="Full Name"
                                value={values.fullName}
                                onChange={handleInputChange}
                                error={errors.fullName}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.Input
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.Input
                                label="Mobile"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleInputChange}
                                error={errors.mobile}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.Input
                                label="City"
                                name="city"
                                value={values.city}
                                onChange={handleInputChange}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.RadioGroup
                                name="gender"
                                label="Gender"
                                value={values.gender}
                                onChange={handleInputChange}
                                items={genderItems}
                            />

                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.Select
                                name="departmentId"
                                label="Department"
                                value={values.departmentId}
                                onChange={handleInputChange}
                                options={employeeService.getDepartmentCollection()}
                                error={errors.departmentId}
                            />

                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Controls.Checkbox
                                name="isPermanent"
                                label="Permanent Employee"
                                value={values.isPermanent}
                                onChange={handleInputChange}
                            />

                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <div>
                                <Controls.Button
                                    type="submit"
                                    text="Submit" />
                                <Controls.Button
                                    text="Reset"
                                    color="default"
                                    onClick={resetForm} />
                            </div>
                        </GridItem>
                    </GridContainer>
                </Form >
            </CardContent >
        </Card >
    )
}