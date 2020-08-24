import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_FORMS, FALSE_RESPONSE } from '../actions/types';

const initialState = {
  allProducts: [],
  formFields: []
}

export default function (state = initialState, action) {
  switch (action.type) {

    case FALSE_RESPONSE:
      return {
        ...state
      }

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
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
