/** @format */

import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";

import todosStore from "./src/redux/store/TodosStore";

const AppWithStore = () => (
  <Provider store={todosStore}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithStore);
