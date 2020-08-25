import { TOGGLE_FILTER_OPTION } from "../actions/types";

const initialState = {
  selectedFilterIndex: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER_OPTION:
      return {
        ...state,
        selectedFilterIndex: action.payload
      };

    default:
      return state;
  }
}
