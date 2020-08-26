import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_FORMS, GET_ALL_PRODUCTS_INIT, FALSE_RESPONSE } from '../actions/types';

const initialState = {
  allProducts: [],
  formFields: [],
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

    case GET_ALL_PRODUCTS_FORMS:
      return {
        ...state,
        formFields: action.payload
      }

    default:
      return state;
  }
}
