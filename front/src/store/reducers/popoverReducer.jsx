import { TOGGLE_POPOVER } from '../actions/types'

const initialState = {
    isPopoverOpen: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_POPOVER:
            return {
                ...state,
                isPopoverOpen: action.payload,
            }

        default:
            return state
    }
}
