import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from './types'

export const openSuccessNotification = (message) => (dispatch) => {
    dispatch({
        type: OPEN_NOTIFICATION,
        payload: { open: true, message: message, severity: 'success' },
    })
}

export const openFailureNotification = (message) => (dispatch) => {
    dispatch({
        type: OPEN_NOTIFICATION,
        payload: { open: true, message: message, severity: 'error' },
    })
}

export const closeNotification = () => (dispatch) => {
    dispatch({
        type: CLOSE_NOTIFICATION,
    })
}
