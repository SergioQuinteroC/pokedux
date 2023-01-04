import { combineReducers } from "redux";
import dataReducer from "../slices/dataSlice";
import uiReducer from '../slices/uiSlice.js';

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer
});

export default rootReducer;
