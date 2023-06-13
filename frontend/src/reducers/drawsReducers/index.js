import { combineReducers } from 'redux';
import createDrawsReducer from './createDrawsReducer';
import fetchDrawsReducer from './fetchDrawsReducer';
import getCreateDrawsReducer from './getCreateDrawsReducer';
import searchPlayerReducer from './searchPlayerReducer';


export default combineReducers({
   createdraws : createDrawsReducer,
   fetchdraws : fetchDrawsReducer,
   getCreateDraw :getCreateDrawsReducer,
   searchPlayer : searchPlayerReducer
});