import {GET_ALL_PRODUCTS, FALSE_RESPONSE,GET_ALL_PRODUCTS_INIT} from '../actions/types';

const initialState = {
  allProducts: [],
  isLoading: true,
}

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ALL_PRODUCTS_INIT:
      return {
        isLoading: true,
        ...state
      }

    case FALSE_RESPONSE:
      return {
        ...state
      }

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        isLoading: false
      }  

    default:
      return state;
  }
}
