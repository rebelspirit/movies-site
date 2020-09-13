import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore, combineReducers} from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import server from './reducers/server.reducer'
import client from './reducers/client.reducer'
import thunk from "redux-thunk";
import {saveToLocalStorageMiddleware} from "./middleware/localStorage.middleware";

const rootReducer = combineReducers({
    server,
    client
});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(
        thunk,
        saveToLocalStorageMiddleware
    )
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();