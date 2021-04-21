import { createStore, applyMiddleware, combineReducers } from "redux";
import storage from "./StorageMiddleware";
import UserAuthReducer from "./Reducers/UserAuthReducer";

export default function configureStore(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(storage)(create);

  const appReducer = combineReducers({
    UserAuthReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "ACTION_USER_LOGOUT") {
      state = undefined;
    }
    return appReducer(state, action);
  };

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
