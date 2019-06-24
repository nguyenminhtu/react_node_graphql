import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import createReducer from "./rootReducer";
import rootSaga from "./rootSaga";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export default function configureStore(initialState: Object = {}): any {
  let composeEnhancers: any = compose;

  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const sagaMiddleware: any = createSagaMiddleware();
  const middlewares: Array<any> = [sagaMiddleware];
  const enhancers: Array<any> = [applyMiddleware(...middlewares)];
  const store: any = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
