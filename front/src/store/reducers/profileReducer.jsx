import { GET_USER_APPROVED_STATUS } from '../actions/types'

const initialState = {
    userApprovedStatus: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_APPROVED_STATUS:
            return {
                ...state,
                userApprovedStatus: action.payload,
            }
        default:
            return state
    }
}
