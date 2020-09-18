import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_FORMS,
    GET_ALL_PRODUCTS_INIT,
    GET_COLUMN_DETAILS,
    GET_COLUMN_INIT,
    GET_INITIAL_STATE,
    SET_SELECTED_CATEGORIES,
} from '../actions/types'

import { min } from 'date-fns'

const initialState = {
    totalProducts: 0,
    allProducts: [],
    isLoading: true,
    allCategories: [],
    formFields: [],
    columns: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return { ...initialState }

        case GET_ALL_PRODUCTS_INIT:
            return {
                isLoading: true,
                ...state,
            }

        case FALSE_RESPONSE:
            return {
                ...state,
            }

        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload.response,
                totalProducts: action.payload.totalProducts,
                isLoading: false,
            }

        case GET_ALL_PRODUCTS_FORMS:
            return {
                ...state,
                formFields: action.payload,
            }

        case SET_SELECTED_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload,
            }

        case GET_COLUMN_INIT:
            return {
                isLoading: true,
                ...state,
            }

        case GET_COLUMN_DETAILS:
            const filterCategories = action.payload[0].fields
                .filter((field) => field.datatype !== 'text')
                .map((field) => {
                    const minValue =
                        action.payload[1][field.id] !== undefined &&
                        action.payload[1][field.id] !== null
                            ? parseInt(action.payload[1][field.id][0])
                            : null
                    const maxValue =
                        action.payload[1][field.id] !== undefined &&
                        action.payload[1][field.id] !== null
                            ? parseInt(action.payload[1][field.id][1])
                            : null
                    return {
                        id: field.id,
                        label: field.labelText,
                        options: {
                            dataType:
                                field.datatype === 'number'
                                    ? 'number'
                                    : field.datatype === 'date'
                                    ? 'date'
                                    : 'checkbox',
                            optionList: field.menuitems.map(
                                (menu) => menu.title
                            ),
                            maximumValue: maxValue,
                            minimumValue: minValue,
                        },
                        selected:
                            action.payload[1][field.id] === undefined
                                ? []
                                : [minValue, maxValue],
                    }
                })
                .filter(
                    (field) =>
                        !(
                            field.options.dataType === 'number' &&
                            (field.options.maximumValue === null ||
                                field.options.minimumValue === null ||
                                field.options.minimumValue ===
                                    field.options.maximumValue)
                        )
                )
            return {
                ...state,
                columns: action.payload[0].fields.map((field) => {
                    return {
                        name: field.id,
                        label: field.labelText,
                        options: {
                            sort: true,
                        },
                    }
                }),
                isLoading: false,
                allCategories: filterCategories,
            }

        default:
            return state
    }
}
