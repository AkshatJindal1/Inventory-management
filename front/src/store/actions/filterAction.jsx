import { TOGGLE_FILTER_OPTION } from './types'

export const changeFilterOption = (index) => (dispatch) => {
    dispatch({
        type: TOGGLE_FILTER_OPTION,
        payload: index,
    })
}
