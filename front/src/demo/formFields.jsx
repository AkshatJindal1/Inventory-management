// TODO Take it from web server

const formFields = [
    {
        id: 'name',
        labelText: 'Name',
        required: false,
        disabled: false,
        datatype: 'integer',
        options: [
            {
                id: 'required',
                value: 1
            },
            {
                id: 'min',
                value: 0
            },
            {
                id: 'max',
                value: 10000
            }
        ]
    },
    {
        id: 'email',
        labelText: 'Email',
        required: false,
        disabled: false,
        datatype: 'email',
        options: [
            {
                id: 'required',
                value: 2
            }
        ]
    }
];

export default formFields