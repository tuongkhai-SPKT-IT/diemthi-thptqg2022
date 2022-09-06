import { combineReducers } from "redux";
import HomeReducer from "./Home.Reducer";
const myReducer = combineReducers({
  HomePage: HomeReducer,
});
export default myReducer;
