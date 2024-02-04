import { createStore } from "redux";
import reducer from "./reducers/rootReducer";

const store = createStore(
  reducer,
  (window as any)?.__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
