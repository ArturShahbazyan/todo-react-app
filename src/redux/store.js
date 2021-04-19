import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import todoReducer from "./reducers/todoReducer";
import singleTaskReducer from "./reducers/singleTaskReducer";
import counterReducer from "./reducers/counterReducer";
import contactReducer from "./reducers/contactReducer";
import reducer from "./reducers/reducer";
import searchReducer from "./reducers/searchReducer";
import actionsModalReducer from "./reducers/actionsModalReducer"

const middlewares = [thunk, logger];

const reducers = combineReducers({
    todoState: todoReducer,
    singleTaskState: singleTaskReducer,
    counterState: counterReducer,
    contactState: contactReducer,
    searchState: searchReducer,
    actionsModalState: actionsModalReducer,
    globalState:reducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;