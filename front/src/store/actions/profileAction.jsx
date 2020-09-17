import { BASE_URL } from './constants'
import { FALSE_RESPONSE } from './types'
import axios from 'axios'

export const checkUserRegistered = (token, callback = () => {}) => (
    dispatch
) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    const url = `${BASE_URL}/user-management`

    axios
        .get(url, {
            headers: headers,
        })
        .then((resp) => {
            const data = resp.data
            if (!data.templateSelected) {
                callback('set-profile')
            } else callback(null)
        })
        .catch((err) =>
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        )
}

export const getIndustryList = (token, callback = () => {}) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    const url = `${BASE_URL}/user-management/industry`

    axios
        .get(url, {
            headers: headers,
        })
        .then((resp) => {
            callback(resp.data)
        })
        .catch((err) =>
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        )
}

export const checkCompanyAlreadyExists = (token, name, callback = () => {}) => (
    dispatch
) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    const url = `${BASE_URL}/user-management/clients/${name}`

    axios
        .get(url, {
            headers: headers,
        })
        .then((resp) => {
            callback(resp.data)
        })
        .catch((err) =>
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        )
}

export const saveClientInfo = (
    onSuccess = () => {},
    onError = () => {},
    payload,
    token
) => (dispatch) => {
    const { companyName, industry } = payload
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    const url = `${BASE_URL}/user-management/?clientName=${companyName}&industry=${industry}`

    axios
        .post(url, '', {
            headers: headers,
        })
        .then((resp) => {
            onSuccess(resp.data)
        })
        .catch((err) => {
            onError(err)
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        })
}
