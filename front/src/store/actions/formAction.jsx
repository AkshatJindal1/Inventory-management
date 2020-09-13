import { BASE_URL } from './constants'
import axios from 'axios'

export const getFormData = (isLoading, onError, productUrl, option, token) => (
    dispatch
) => {
    const dataUrl = `${BASE_URL}/forms/${option}/${productUrl}`
    const datatypeUrl = `${BASE_URL}/forms/datatypes`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    Promise.all([
        axios.get(dataUrl, {
            headers: headers,
        }),

        axios.get(datatypeUrl, {
            headers: headers,
        }),
    ])
        .then(function (responses) {
            return Promise.all(
                responses.map(function (response) {
                    console.log(response)
                    if (response.status !== 200) throw '404 Not Found'
                    return response.data
                })
            )
        })
        .then((data) => isLoading(data[0], data[1]))
        .catch((error) => onError(error))
}

export const getDefaultFormData = (isLoading, onError, option, token) => (
    dispatch
) => {
    const defaultUrl = `${BASE_URL}/forms/${option}/default`
    const datatypeUrl = `${BASE_URL}/forms/datatypes`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    Promise.all([
        axios.get(defaultUrl, {
            headers: headers,
        }),

        axios.get(datatypeUrl, {
            headers: headers,
        }),
    ])
        .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
                responses.map(function (response) {
                    console.log(response)
                    if (response.status !== 200) throw '404 Not Found'
                    return response.data
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
    option,
    token
) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const deleteForms = (isLoading, onError, data, token) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    const url = `${BASE_URL}/forms/delete`

    console.log('Calling API', url)

    axios
        .post(url, data, {
            headers: headers,
        })
        .then((response) => isLoading(data))
        .catch((err) => onError(err))
}

export const getTable = (onSuccess, onError, token) => (dispatch) => {
    const url = `${BASE_URL}/forms/all`

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
