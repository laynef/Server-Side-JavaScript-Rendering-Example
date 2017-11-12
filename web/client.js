/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/store/create';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import getRoutes from './routes/router';
import io from 'socket.io-client';
import { host } from '../config/config';


global.socket = io(host, { path: '/ws' });

const dest = document.getElementById('app');
const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
	<Router
		render={props => <ReduxAsyncConnect {...props} />}
		history={history}
	>
		{getRoutes(store)}
	</Router>
);

ReactDOM.render(
	<Provider store={store} key="provider">
		{component}
	</Provider>,
	dest
);

/* eslint-disable */
if (__DEVELOPMENT__) {
	window.React = React; // enable debugger
}
