import { combineReducers } from 'redux';
import addPlayerToTournamentReducer from './addPlayerToTournamentReducer';
import addtournamentReducer from './addtournamentReducer';
import deletetournamentReducer from './deletetournamentReducer';
import edittournamentReducer from './edittournamentReducer';
import gettournamentReducer from './gettournamentReducer';
import listtournamentReducer from './listtournamentReducer'
import removePlayerFromTournamentReducer from './removePlayerFromTournamentReducer';

export default combineReducers({
  
   addTournament: addtournamentReducer ,
   editTournament: edittournamentReducer,
   deleteTournament: deletetournamentReducer,
   tournamentDetail: gettournamentReducer,
   listTournament : listtournamentReducer,
   addPlayerToTournament : addPlayerToTournamentReducer,
   removePlayerFromTournament : removePlayerFromTournamentReducer,
});