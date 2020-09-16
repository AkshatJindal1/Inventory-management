import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_INIT,
    GET_CATEGORIES,
    GET_CATEGORIES_INIT,
    GET_COLUMN_DETAILS,
    GET_COLUMN_INIT,
    GET_INITIAL_STATE,
    SET_SELECTED_CATEGORIES,
} from './types'

import { BASE_URL } from './constants'
import axios from 'axios'
import store from '../store'

export const getInitialState = () => (dispatch) => {
    dispatch({ type: GET_INITIAL_STATE })
}

export const getAllProducts = (option, formUrl, token, filterOptions = {}) => (
    dispatch
) => {
    dispatch({
        type: GET_ALL_PRODUCTS_INIT,
    })

    console.log('token', token)

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    axios
        .post(`${BASE_URL}/${option}/${formUrl}`, filterOptions, {
            headers: headers,
        })
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

export const setCategories = (categories) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_CATEGORIES,
        payload: categories,
    })
}

export const saveProduct = (isLoading, onError, data, option, token) => (
    dispatch
) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const getProduct = (
    onSuccess,
    onError,
    option,
    formUrl,
    itemUrl,
    token
) => (dispatch) => {
    const url = `${BASE_URL}/${option}/${formUrl}/${itemUrl}`

    console.log(url)

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    axios
        .get(url, {
            headers: headers,
        })
        .then((response) => onSuccess(response.data))
        .catch((err) => onError(err))
}

export const getColumns = (option, formUrl, token) => (dispatch) => {
    dispatch({
        type: GET_COLUMN_INIT,
    })

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    axios
        .get(`${BASE_URL}/forms/${option}/${formUrl}`, {
            headers: headers,
        })
        .then((response) => {
            const fields = response.data.fields
                .filter((resp) => resp.datatype === 'number')
                .map((field) => field.id)

            axios
                .get(
                    `${BASE_URL}/${option}/${formUrl}/min-max/?sortFields=${fields.join()}`,
                    {
                        headers: headers,
                    }
                )
                .then((resp) => {
                    return dispatch({
                        type: GET_COLUMN_DETAILS,
                        payload: [response.data, resp.data],
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}

export const deleteProducts = (
    option,
    formUrl,
    token,
    productList = [],
    filterOptions = {}
) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    axios
        .delete(`${BASE_URL}/${option}/${formUrl}`, {
            headers: headers,
            data: productList,
        })
        .then((resp) => {
            dispatch(getAllProducts(option, formUrl, token, filterOptions))
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}
