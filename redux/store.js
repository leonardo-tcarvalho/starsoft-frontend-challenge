import { createStore } from "redux";

import rootReducer from "./root-reducer.js";

const store = createStore(rootReducer);

export default store;
