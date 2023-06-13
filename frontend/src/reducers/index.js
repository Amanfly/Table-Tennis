import { combineReducers } from 'redux';
import userReducer from '../reducers/userReducers';
import messageReducer from '../reducers/message';
//import tournamentReducer from '../reducers/tournamentReducer';
import loginReducer from './loginReducer';
import verifyemailReducer from './emailReducer';
import forgotReducer from './forgotReducer';
import resetReducer from './resetReducer';
import profileReducer from './profileReducer';
import tournamentReducer from './tournamentReducer';
import playerReducer from './playerReducer';
import drawsReducers from './drawsReducers';
import matchReducer from './matchReducer';
import byesReducer from './byesReducer';
export default combineReducers({
  
    Auth: userReducer,
    user: loginReducer,
    verify: verifyemailReducer,
    forgot: forgotReducer,
    reset: resetReducer,
    profile: profileReducer,
    tournament: tournamentReducer,
    player: playerReducer,
    draws : drawsReducers,
    match : matchReducer,
    byes : byesReducer
});