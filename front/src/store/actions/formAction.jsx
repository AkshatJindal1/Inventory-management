import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_INIT,
    GET_CATEGORIES,
    GET_CATEGORIES_INIT,
} from './types'

import { BASE_URL } from './constants'
import axios from 'axios'

export const getFormData = (isLoading, onError, productUrl, option) => (
    dispatch
) => {
    const url = `${BASE_URL}/forms/${option}/url?url=${productUrl}`

    Promise.all([fetch(url), fetch(`${BASE_URL}/forms/datatypes`)])
        .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
                responses.map(function (response) {
                    if (response.status !== 200) throw '404 Not Found'
                    return response.json()
                })
            )
        })
        .then(function (data) {
            isLoading(data[0], data[1])
        })
        .catch(function (error) {
            onError(error)
        })
}

export const getDefaultFormData = (isLoading, onError, option) => (
    dispatch
) => {
    const url = `${BASE_URL}/forms/${option}/default`

    Promise.all([fetch(url), fetch(`${BASE_URL}/forms/datatypes`)])
        .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
                responses.map(function (response) {
                    if (response.status !== 200) throw '404 Not Found'
                    return response.json()
                })
            )
        })
        .then((data) => isLoading(data[0], data[1]))
        .catch((error) => onError(error))
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
