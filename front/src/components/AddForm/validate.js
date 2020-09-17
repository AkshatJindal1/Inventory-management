import validator from 'validator'

const isRequired = (errorCondition, key) => {
    let temp = {}
    temp[key] = errorCondition.required
        ? errorCondition.conditions.errorText || 'This field is required.'
        : ''
    return temp
}

const numberValidation = (value, errorCondition, key) => {
    let temp = {}
    if (isNaN(value)) {
        temp[key] =
            errorCondition.conditions.errorText ||
            'The value should be a number.'
    } else if (
        (errorCondition.conditions.min != null &&
            !isNaN(errorCondition.conditions.min) &&
            parseInt(value) < parseInt(errorCondition.conditions.min)) ||
        (errorCondition.conditions.max != null &&
            !isNaN(errorCondition.conditions.max) &&
            parseInt(value) > parseInt(errorCondition.conditions.max))
    ) {
        temp[key] =
            errorCondition.conditions.errorText ||
            'Number not in a valid range.'
    } else temp[key] = ''
    return temp
}

const emailValidation = (value, errorCondition, key) => {
    let temp = {}
    temp[key] = validator.isEmail(value)
        ? ''
        : errorCondition.conditions.errorText || 'Not a valid Email ID.'
    return temp
}
const textValidation = (value, errorCondition, key) => {
    let temp = {}
    temp[key] =
        errorCondition.conditions.max != null &&
        !isNaN(errorCondition.conditions.max) &&
        parseInt(value.length) > parseInt(errorCondition.conditions.max)
            ? errorCondition.conditions.errorText ||
              'Exceeds the max length of ' +
                  parseInt(errorCondition.conditions.max) +
                  '.'
            : ''
    return temp
}

const productDefault = [
    'productId',
    'productName',
    'description',
    'image',
    'cost',
    'quantityInStock',
    'quantityInTransit',
    'benchmark',
]

const optionDefault = ['name']

const defaultTypes = ['number', 'text', 'email', 'boolean']

const getTypeAndValue = (structure, value, key) => {
    const structureDetails = structure.find((v, k) => v.id == key)
    if (defaultTypes.includes(structureDetails.datatype))
        return {
            ref: '',
            value: value,
        }
    else {
        const optionObject = structureDetails.menuitems.find(
            (v, k) => v.id == value
        )
        const finalValue = optionObject ? optionObject.title : ''

        return {
            ref: value,
            value: finalValue,
        }
    }
}

const changeStructure = (values, option, structure) => {
    let newValues = {}
    let defaultValues = []
    if (option == 'products') {
        defaultValues = productDefault
    } else if (option == 'options') {
        defaultValues = optionDefault
    }

    for (const [key, value] of Object.entries(values)) {
        if (defaultValues.includes(key)) {
            newValues[key] = value
        } else {
            newValues[key] = getTypeAndValue(structure, value, key)
        }
    }

    return newValues
}

const ValidateFields = {
    isRequired,
    numberValidation,
    emailValidation,
    textValidation,
    changeStructure,
}

export default ValidateFields
