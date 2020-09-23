import datatypes from '../../demo/datatypes'

const input = ['number', 'text', 'email']
const checkbox = ['boolean']
const image = ['image']

export default function getType(datatype) {
    if (input.includes(datatype)) return 'input'
    else if (checkbox.includes(datatype)) return 'checkbox'
    else if (image.includes(datatype)) return 'image'
    else return 'select'
}
