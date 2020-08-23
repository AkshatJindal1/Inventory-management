// TODO Take it from web server

const datatypes = {
    'integer': {
        id: 'integer',
        labelText: 'integer',
        options: [
            {
                id: 'min',
                labelText: 'Minimum',
                conditions: [{
                    type: 'integer',
                    errorText: 'Value Should be a valid Number'
                }]
            },
            {
                id: 'max',
                labelText: 'Maximum',
                conditions: [{
                    type: 'integer',
                    errorText: 'Value Should be a valid Number'
                }]
            }
        ]
    },
    'float': {
        id: 'float',
        labelText: 'float',
        options: [
            {
                id: 'min',
                labelText: 'Minimum',
                conditions: [{
                    type: 'integer',
                    errorText: 'Value Should be a valid Number'
                }]
            },
            {
                id: 'max',
                labelText: 'Maximum',
                conditions: [{
                    type: 'integer',
                    errorText: 'Value Should be a valid Number'
                }]
            }
        ]
    },
    'email': {
        id: 'email',
        labelText: 'email',
    },
    'text': {
        id: 'text',
        labelText: 'text',
        options: [
            {
                id: 'max',
                labelText: 'Maximum Length',
                conditions: [{
                    type: 'integer',
                    errorText: 'Value Should be a valid Number'
                }]
            }
        ]
    },
    'material': {
        id: 'material',
        labelText: 'Material',
        options: []
    },
    'size': {
        id: 'size',
        labelText: 'Size',
    }
};

export default datatypes