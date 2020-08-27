import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_INIT,
    GET_CATEGORIES,
    GET_CATEGORIES_INIT,
    GET_ALL_PRODUCTS_FORMS
} from '../actions/types'

const initialState = {
    allProducts: [],
    isLoading: true,
    isCategoriesLoading: true,
    allCategories: [],
    formFields: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
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
                allProducts: action.payload,
                isLoading: false,
            }

        case GET_CATEGORIES_INIT:
            return {
                isCategoriesLoading: true,
                ...state,
            }

        case GET_ALL_PRODUCTS_FORMS:
            return {
                ...state,
                formFields: action.payload,
            }

        case GET_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload,
                isCategoriesLoading: false,
            }

        default:
            return state
    }
}
