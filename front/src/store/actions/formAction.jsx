import {
    FALSE_RESPONSE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_INIT,
    GET_CATEGORIES,
    GET_CATEGORIES_INIT,
} from './types'

import { BASE_URL } from './constants'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const { getAccessTokenSilently } = useAuth0()

export const getFormData = (isLoading, onError, productUrl, option) => (
    dispatch
) => {
    const url = `${BASE_URL}/forms/${option}/url?url=${productUrl}`
    console.log(url)

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

export const saveForm = (
    isLoading,
    onError,
    data,
    formName,
    formId,
    option
) => (dispatch) => {
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
        .catch((err) => onError(err))
}

export const deleteForms = (isLoading, onError, data) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    const url = `${BASE_URL}/forms/`

    console.log('Calling API', url)

    axios
        .delete(url, {
            data: data,
            headers: headers,
        })
        .then((response) => isLoading(data))
        .catch((err) => onError(err))
}

export const getTable = (onSuccess, onError) => {
    const accessToken = getAccessTokenSilently({
        audience: `https://quickstarts/api`,
        scope: 'read:current_user',
    }).then((response) => console.log(response))

    console.log(accessToken)

    const url = `${BASE_URL}/forms/all`

    console.log(url)

    axios
        .get(url)
        .then((response) => onSuccess(response.data))
        .catch((err) => onError(err))
}
