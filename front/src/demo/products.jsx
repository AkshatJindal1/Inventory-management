// TODO Take it from web server

const formFields = [
    {
        id: 'productId',
        labelText: 'Product Id',
        error: false,
        disabled: true,
        required: true,
        defaultValue: '11111',
        datatype: 'integer',
        conditions: {
            min: 10000,
            max: 99999,
            errorText: 'Value should be 5 digits',
        },
    },
    {
        id: 'productName',
        labelText: 'Product Name',
        disabled: false,
        required: true,
        defaultValue: 'Nike T Shirt',
        error: false,
        datatype: 'text',
    },
    {
        id: 'email',
        labelText: 'Email',
        disabled: false,
        required: true,
        defaultValue: 'nike@nike.nike',
        type: 'email',
        error: false,
        datatype: 'email',
        conditions: {
            errorText: 'not a valid email id',
        },
    },
    {
        id: 'inStock',
        labelText: 'In Stock',
        disabled: false,
        error: false,
        required: false,
        datatype: 'integer',
        conditions: {
            min: 100,
            errorText: 'Value Should be a valid Number',
        },
    },
    {
        id: 'description',
        labelText: 'Description',
        error: false,
        required: false,
        datatype: 'text',
    },
    {
        id: 'material',
        labelText: 'Material',
        error: false,
        required: false,
        datatype: 'material',
        menuitems: [
            {
                id: 1,
                labelText: 'Cotton',
            },
            {
                id: 2,
                labelText: 'Silicon',
            },
            {
                id: 3,
                labelText: 'Hosery',
            },
        ],
    },
    {
        id: 'size',
        labelText: 'Size',
        error: false,
        required: true,
        datatype: 'size',
        menuitems: [
            {
                id: 1,
                labelText: 'XS',
            },
            {
                id: 2,
                labelText: 'S',
            },
            {
                id: 3,
                labelText: 'M',
            },
            {
                id: 4,
                labelText: 'L',
            },
            {
                id: 5,
                labelText: 'XL',
            },
            {
                id: 6,
                labelText: 'XXL',
            },
        ],
    },
]

export default formFields
