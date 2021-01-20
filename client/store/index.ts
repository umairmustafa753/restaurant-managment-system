import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import featuredItemsReducer from "./Reducers/featuredItems";
import menuReducer from "./Reducers/menu";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({ featuredItemsReducer, menuReducer });
const store = createStore(rootReducer, middleware);

export default store;
