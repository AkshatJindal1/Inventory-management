import { TOGGLE_DRAWER } from "../actions/types";

const initialState = {
  isDrawerOpen: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state, 
        isDrawerOpen: !state.isDrawerOpen
      };

    default:
      return state;
  }
}
