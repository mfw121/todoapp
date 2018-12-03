import { combineReducers } from "redux";
import todosReducer from "./TodosReducer";

const appReducer = combineReducers({
  todosReducer
});

export default appReducer;
