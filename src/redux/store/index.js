import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "../reducers";

const middleWare = [thunk];
const store = createStore(
  reducers,
  undefined,
  compose(applyMiddleware(...middleWare))
);
export default store;
