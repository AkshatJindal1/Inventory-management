import { combineReducers } from 'redux';
import productReducer from './productReducer';
import config from '../../config'

export default combineReducers({
  ...config,
  product: productReducer
});
