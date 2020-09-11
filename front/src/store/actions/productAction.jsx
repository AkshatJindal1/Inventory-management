import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_INIT,
    GET_CATEGORIES,
    GET_CATEGORIES_INIT,
    GET_COLUMN_DETAILS,
    GET_COLUMN_INIT,
    SET_SELECTED_CATEGORIES,
} from './types'

import { BASE_URL } from './constants'
import axios from 'axios'
import store from '../store'

export const getAllProducts = (option, formUrl, filterOptions = {}) => (
    dispatch
) => {
    dispatch({
        type: GET_ALL_PRODUCTS_INIT,
    })

    axios
        .post(`${BASE_URL}/${option}/${formUrl}`, filterOptions)
        .then((response) =>
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: response.data,
            })
        )
        .catch((err) => {
            console.log(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}

export const getCategories = () => (dispatch) => {
    dispatch({
        type: GET_CATEGORIES_INIT,
    })

    axios
        .get(BASE_URL + '/categories')
        .then((response) =>
            dispatch({
                type: GET_CATEGORIES,
                payload: response.data,
            })
        )
        .catch((err) => {
            console.log(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}

export const setCategories = (categories) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_CATEGORIES,
        payload: categories,
    })
}

export const saveProduct = (isLoading, onError, data, option) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    const url = `${BASE_URL}/${option}`

    console.log('Calling API', url)

    axios
        .post(url, data, {
            headers: headers,
        })
        .then((response) => isLoading(response.data))
        .catch((err) => {
            onError(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}

export const getProduct = (onSuccess, onError, option, formUrl, itemUrl) => (
    dispatch
) => {
    const url = `${BASE_URL}/${option}/${formUrl}/${itemUrl}`

    console.log(url)

    axios
        .get(url)
        .then((response) => onSuccess(response.data))
        .catch((err) => onError(err))
}

export const getColumns = (option, formUrl) => (dispatch) => {
    dispatch({
        type: GET_COLUMN_INIT,
    })

    axios
        .get(`${BASE_URL}/forms/${option}/url?url=${formUrl}`)
        .then((response) => {
            const fields = response.data.fields
                .filter((resp) => resp.datatype === 'number')
                .map((field) => field.id)

            axios
                .get(
                    `${BASE_URL}/${option}/${formUrl}/min-max/?sortFields=${fields.join()}`
                )
                .then((resp) => {
                    return dispatch({
                        type: GET_COLUMN_DETAILS,
                        payload: [response.data, resp.data],
                    })
                })
        })
        .then(console.log('hello', store.getState().product.allCategories))
        .catch((err) => {
            console.log(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}
