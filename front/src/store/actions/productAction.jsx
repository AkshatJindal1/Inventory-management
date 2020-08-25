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

