import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Container1 from "././components/Container1";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {reducer} from "./reducers/reducer";

var store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
    <Provider store={store}>
        <Container1 />
    </Provider>, document.getElementById("root"));

registerServiceWorker();
