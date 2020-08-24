import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_FORMS, FALSE_RESPONSE } from './types';

import { BASE_URL } from './constants';
import axios from 'axios';

export const getAllProducts = () => dispatch => {
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

