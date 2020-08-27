import datatypes from '../../demo/datatypes'

const input = ['number', 'text', 'email']
const checkbox = ['boolean']

export default function getType(datatype) {
    if (input.includes(datatype)) return 'input'
    else if (checkbox.includes(datatype)) return 'checkbox'
    else return 'select'
}
