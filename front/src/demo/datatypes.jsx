// TODO Take it from web server

const datatypes = {
    integer: {
        id: 'integer',
        labelText: 'integer',
        errorText: 'Not a valid Number',
        options: [
            {
                id: 'min',
                labelText: 'Minimum',
                datatype: 'integer',
            },
            {
                id: 'max',
                labelText: 'Maximum',
                datatype: 'integer',
            },
            {
                id: 'errorText',
                labelText: 'Error Text',
                datatype: 'text',
            },
        ],
    },
    float: {
        id: 'float',
        labelText: 'float',
        errorText: 'Not a valid Number',
        options: [
            {
                id: 'min',
                labelText: 'Minimum',
                datatype: 'float',
            },
            {
                id: 'max',
                labelText: 'Maximum',
                datatype: 'float',
            },
            {
                id: 'errorText',
                labelText: 'Error Text',
                datatype: 'text',
            },
        ],
    },
    email: {
        id: 'email',
        labelText: 'email',
        errorText: 'Not a valid Email Id',
        options: [
            {
                id: 'errorText',
                labelText: 'Error Text',
                datatype: 'text',
            },
        ],
    },
    text: {
        id: 'text',
        labelText: 'text',
        errorText: 'Not a valid Text',
        options: [
            {
                id: 'max',
                labelText: 'Maximum Length',
                datatype: 'integer',
            },
            {
                id: 'errorText',
                labelText: 'Error Text',
                datatype: 'text',
            },
        ],
    },
    material: {
        id: 'material',
        labelText: 'Material',
    },
    size: {
        id: 'size',
        labelText: 'Size',
    },
}

export default datatypes
