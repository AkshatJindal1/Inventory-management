import {GET_ALL_PRODUCTS, FALSE_RESPONSE} from '../actions/types';

const initialState = {
  allProducts: []
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

    default:
      return state;
  }
}
