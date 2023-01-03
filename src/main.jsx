import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { pokemonsReducer } from "./reducers/pokemons";
import { Provider } from "react-redux";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { featuring, logger, nameUpperCase } from "./middlewares";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const actionSanitizer = (action) => (
//   action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
//   { ...action, data: '<<LONG_BLOB>>' } : action
// );


const composeAlt =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeAlt(applyMiddleware(thunk, logger, nameUpperCase));

const store = createStore(pokemonsReducer, composedEnhancers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
