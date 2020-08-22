// TODO Take it from web server

const formFields = [
    {
        id: 'productId',
        labelText: 'Product Id',
        error: false,
        disabled: true,
        required: true,
        type: 'number',
        defaultValue: '11111',
        conditions: [
            {
                type: 'required',
                errorText: 'Value cannot be empty'
            }, {
                type: "integer",
                min: 10000,
                max: 99999,
                errorText: "Value should be 5 digits"
            }]
    },
    {
        id: 'productName',
        labelText: 'Product Name',
        disabled: false,
        required: true,
        error: false,
        type: 'string',
        conditions: [{
            type: 'required',
            errorText: 'Value cannot be empty'
        }]
    },
    {
        id: 'email',
        labelText: 'Email',
        disabled: false,
        required: true,
        error: false,
        conditions: [{
            type: 'email',
            errorText: 'not a valid email id'
        }]
    },
    {
        id: 'inStock',
        labelText: 'In Stock',
        disabled: false,
        error: false,
        conditions: [{
            type: 'float',
            min: 0,
            max: 100,
            errorText: 'Value should be positive'
        }]
    },
    {
        id: 'description',
        labelText: 'Description',
        error: false,
        required: false,
    }
];

export default formFields