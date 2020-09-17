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
            console.log(resp)
            const data = resp.data
            if (!data.templateSelected) {
                callback('SetProfile')
            } else callback(null)
        })
        .catch((err) =>
            dispatch({
                type: FALSE_RESPONSE,
                payload: false,
            })
        )
}
