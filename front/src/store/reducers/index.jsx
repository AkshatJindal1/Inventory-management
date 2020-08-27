import appReducer from './appReducer'
import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import popoverReducer from './popoverReducer'
import productReducer from './productReducer'

export default combineReducers({
    product: productReducer,
    app: appReducer,
    filter: filterReducer,
    popover: popoverReducer,
})
