import appReducer from './appReducer'
import { combineReducers } from 'redux'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import popoverReducer from './popoverReducer'
import productReducer from './productReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    product: productReducer,
    app: appReducer,
    filter: filterReducer,
    popover: popoverReducer,
    profile: profileReducer,
    notification: notificationReducer,
})
