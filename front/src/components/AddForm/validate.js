const isRequired = (value, errorCondition, key) => {

    let temp = {}

    if (value === '') {
        temp[key] = errorCondition.required ? errorCondition.conditions.errorText || "This field is required." : ""
    }

    return temp
}

const ValidateFields = {
    isRequired
}

export default ValidateFields;