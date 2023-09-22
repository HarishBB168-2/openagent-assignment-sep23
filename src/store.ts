import { StoreEnhancer, createStore } from "redux";
import rootReducer from "./reducers/index";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () =>
      | StoreEnhancer<unknown, unknown>
      | undefined;
  }
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
