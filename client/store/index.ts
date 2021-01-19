import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import featuredItemsReducer from "./Reducers/featuredItems";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({ featuredItemsReducer });
const store = createStore(rootReducer, middleware);

export default store;
