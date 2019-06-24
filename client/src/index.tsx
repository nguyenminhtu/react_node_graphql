import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";

const initialState: Object = {};
const store: any = configureStore(initialState);
const MOUNT_NODE: any = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
);

serviceWorker.unregister();
