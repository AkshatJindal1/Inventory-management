import validator from 'validator';

const isRequired = (errorCondition, key) => {
    let temp = {}
    temp[key] = errorCondition.required ? errorCondition.conditions.errorText || "This field is required." : ""
    return temp
}

const numberValidation = (value, errorCondition, key) => {
    let temp = {}
    if (isNaN(value)) {
        temp[key] = errorCondition.conditions.errorText || "The value should be a number.";
    }
    else if ((errorCondition.conditions.min != null && !isNaN(errorCondition.conditions.min) && parseInt(value) < parseInt(errorCondition.conditions.min))
        || (errorCondition.conditions.max != null && !isNaN(errorCondition.conditions.max) && parseInt(value) > parseInt(errorCondition.conditions.max))) {
        temp[key] = errorCondition.conditions.errorText || "Number not in a valid range.";
    } else temp[key] = ""
    return temp
}

const emailValidation = (value, errorCondition, key) => {
    let temp = {}
    temp[key] = validator.isEmail(value) ? "" : errorCondition.conditions.errorText || "Not a valid Email ID."
    return temp
}
const textValidation = (value, errorCondition, key) => {
    let temp = {}
    temp[key] = (errorCondition.conditions.max != null && !isNaN(errorCondition.conditions.max) && parseInt(value.length) > parseInt(errorCondition.conditions.max))
        ? errorCondition.conditions.errorText || "Exceeds the max length of " + parseInt(errorCondition.conditions.max) + "."
        : ""
    return temp
}

const ValidateFields = {
    isRequired,
    numberValidation,
    emailValidation,
    textValidation
}

export default ValidateFields;