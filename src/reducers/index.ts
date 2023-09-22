import { combineReducers } from "redux";
import changeTheNumber from "./upDown";
import changePage from "./changePage";

const rootReducer = combineReducers({
  changeTheNumber,
  changePage,
});

export default rootReducer;
