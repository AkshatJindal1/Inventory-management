import { TOGGLE_POPOVER } from './types'

export const togglePopover = (isPopoverOpen) => (dispatch) => {
    dispatch({
        type: TOGGLE_POPOVER,
        payload: isPopoverOpen,
    })
}
