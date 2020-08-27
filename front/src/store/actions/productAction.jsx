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
export const getAllFields = (isLoading) => dispatch => {
  axios
    .get(BASE_URL + '/forms')
    .then(response =>
      isLoading(response.data)
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
      })
    })
}

export const saveForm = (isLoading, data, path) => dispatch => {
  console.log("Calling API", BASE_URL + path)

  const headers = {
    'Content-Type': 'application/json',
  }

  axios
    .post(BASE_URL + path, data, {
      headers: headers
    })
    .then(response =>
      isLoading(response.data)
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
      })
    })
}

