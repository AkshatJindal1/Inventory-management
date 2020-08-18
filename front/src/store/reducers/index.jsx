import { combineReducers } from 'redux';
import productReducer from './productReducer';
import appReducer from './appReducer';

export default combineReducers({
  product: productReducer,
  app: appReducer
});
