import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_INIT,
    GET_CATEGORIES,
    GET_CATEGORIES_INIT,
} from './types'

import { BASE_URL } from './constants'
import axios from 'axios'

export const getAllProducts = () => (dispatch) => {
    dispatch({
        type: GET_ALL_PRODUCTS_INIT,
    })

    axios
        .get(BASE_URL + '/products')
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

export const getFormData = (isLoading, onError, productUrl, option) => (
    dispatch
) => {
    const url = `${BASE_URL}/forms/${option}/url?url=${productUrl}`

    axios
        .get(url)
        .then((response) => isLoading(response.data))
        .catch((err) => {
            onError(err.message)
        })
}

export const getDefaultFormData = (isLoading, onError, option) => (
    dispatch
) => {
    const url = `${BASE_URL}/forms/${option}/default`

    axios
        .get(url)
        .then((response) => isLoading(response.data))
        .catch((err) => {
            onError(err.message)
        })
}

export const saveForm = (isLoading, data, formName, formId, option) => (
    dispatch
) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    const url = `${BASE_URL}/forms/${option}?formId=${formId}&formName=${formName}`

    console.log('Calling API', url)

    axios
        .post(url, data, {
            headers: headers,
        })
        .then((response) => isLoading(response.data))
        .catch((err) => {
            console.log(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}
