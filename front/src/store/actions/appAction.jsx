import { TOGGLE_DRAWER } from './types'

import { BASE_URL } from './constants'
import axios from 'axios'

export const toggleDrawer = () => (dispatch) => {
    dispatch({
        type: TOGGLE_DRAWER,
    })
}
