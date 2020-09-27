import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from '../actions/types'

const initialState = {
    open: false,
    message: '',
    severity: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CLOSE_NOTIFICATION:
            return { ...initialState }

        case OPEN_NOTIFICATION:
            return {
                ...action.payload,
            }
        default:
            return state
    }
}
