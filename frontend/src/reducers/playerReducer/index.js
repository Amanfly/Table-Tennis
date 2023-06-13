import { combineReducers } from 'redux';
import getplayerReducer from './getplayerReducer';
import updateplayerReducer from './updateplayerReducer';
import listplayerReducer from './listplayerReducer';
import deleteplayerReducer from './deleteplayerReducer';
import addplayerReducer from './addplayerReducer';

export default combineReducers({
  
   updatePlayer: updateplayerReducer,
    getPlayer : getplayerReducer,
    listPlayer : listplayerReducer,
    deletePlayer : deleteplayerReducer,
    addPlayer : addplayerReducer,

 });