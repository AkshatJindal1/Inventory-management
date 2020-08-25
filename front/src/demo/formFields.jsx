// TODO Take it from web server

const formFields = [
    {
        id: 'productId',
        labelText: 'Product Id',
        error: false,
        disabled: true,
        required: true,
        datatype: 'number',
        type: 'input',
        conditions: {
            min: 10000,
            max: 99999,
            errorText: "Value should be 5 digits"
        }
    },
    {
        id: 'productName',
        labelText: 'Product Name',
        disabled: false,
        required: false,
        error: false,
        type: 'input',
        datatype: 'text',
        conditions: {
            max: "15"
        }
    },
    {
        id: 'email',
        labelText: 'Email',
        disabled: false,
        required: false,
        type: 'email',
        error: false,
        datatype: 'email',
        type: 'input',
        conditions: {
            errorText: 'not a valid email id'
        }
    },
    {
        id: 'inStock',
        labelText: 'In Stock',
        disabled: false,
        error: false,
        required: false,
        datatype: 'number',
        type: 'input',
        conditions: {
            min: "100",
            errorText: 'Value Should be a valid Number'
        }
    },
    {
        id: 'description',
        labelText: 'Description',
        error: false,
        required: false,
        type: 'input',
        datatype: 'text',
    },
    {
        id: 'material',
        labelText: 'Material',
        error: false,
        required: false,
        datatype: 'material',
        type: 'select',
        menuitems: [
            {
                id: 1,
                title: "Cotton"
            },
            {
                id: 2,
                title: "Silicon"
            },
            {
                id: 3,
                title: "Hosery"
            }
        ]
    },
    {
        id: 'size',
        labelText: 'Size',
        error: false,
        required: false,
        datatype: 'size',
        type: 'select',
        menuitems: [
            {
                id: 1,
                title: "XS"
            },
            {
                id: 2,
                title: "S"
            },
            {
                id: 3,
                title: "M"
            },
            {
                id: 4,
                title: "L"
            },
            {
                id: 5,
                title: "XL"
            },
            {
                id: 6,
                title: "XXL"
            }

        ]
    },
    {
        id: 'required',
        labelText: 'Required',
        required: false,
        datatype: 'checkbox',
        type: 'checkbox',
        disabled: false
    }
];

export default formFields