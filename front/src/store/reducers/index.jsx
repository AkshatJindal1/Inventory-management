import { combineReducers } from 'redux';
import productReducer from './productReducer';
import appReducer from './appReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  product: productReducer,
  app: appReducer,
  filter: filterReducer,
});
