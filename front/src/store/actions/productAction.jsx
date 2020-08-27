import { GET_ALL_PRODUCTS, FALSE_RESPONSE, GET_ALL_PRODUCTS_INIT } from './types';

import { BASE_URL } from './constants';
import axios from 'axios';

export const getAllProducts = () => dispatch => {

  dispatch({
    type: GET_ALL_PRODUCTS_INIT,
  })

  axios
    .get(BASE_URL + '/products')
    .then(response =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
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

export const getFormData = (isLoading, onError, productUrl) => dispatch => {
  axios
    .get(BASE_URL + '/forms/url?url=' + productUrl)
    .then(response =>
      isLoading(response.data)
    )
    .catch(err => {
      onError(err.message)
    })
}

export const getDefaultFormData = (isLoading, onError) => dispatch => {

  const url = BASE_URL + "/forms/default"

  axios
    .get(url)
    .then(response =>
      isLoading(response.data)
    )
    .catch(err => {
      onError(err.message)
    })
}

export const saveForm = (isLoading, data, formName, formId) => dispatch => {

  const headers = {
    'Content-Type': 'application/json',
  }

  const url = `${BASE_URL}/forms?formId=${formId}&formName=${formName}`

  console.log("Calling API", url)

  axios
    .post(url, data, {
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

