import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

//const store = createStore(rootReducer, applyMiddleware(...middleware));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;