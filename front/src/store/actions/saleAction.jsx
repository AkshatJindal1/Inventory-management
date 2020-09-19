import { BASE_URL } from './constants'
import axios from 'axios'

export const saveSale = (isLoading, onError, data, token) => (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    const url = `${BASE_URL}/sales`

    console.log('Calling API', url)

    axios
        .post(url, data, {
            headers: headers,
        })
        .then((response) => isLoading(response.data))
        .catch((err) => onError(err))
}
