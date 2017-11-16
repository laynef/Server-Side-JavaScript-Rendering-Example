import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { __CLIENT__ } from '../globals';
// Pages
import {
	MasterPage,
	PublicPage,
	DashboardPage,
	NotFoundPage,
	SignUpPage,
} from '../pages/containers';


export default () => {
	const requireLogin = (nextState, replace, cb) => {
		if (__CLIENT__ && (!window.__data.user.data || !window.__data.user.data.userId)) {
			replace('/');
		}
		cb();
	};
	const redirect = (nextState, replace, cb) => {
		if (__CLIENT__ && window.__data.user.data !== null) {
			replace('/dashboard');
		}
		cb();
	};
	const disableQueries = (nextState, replace, cb) => {
		const { routing: { locationBeforeTransitions: { search, pathname }}} = store.getState();
		if (search !== '') {
			replace(pathname);
		}
		cb();
	};
	return (
		<Route onEnter={disableQueries}>
			<Route path="/" component={MasterPage}>

				<Route onEnter={redirect}>
					<IndexRoute component={PublicPage} />
					<Route path="signup" component={SignUpPage} />
				</Route>

				<Route onEnter={requireLogin}>
					<Route path="dashboard" component={DashboardPage} />
				</Route>

				<Route path="*" component={NotFoundPage} />
			</Route>
		</Route>
	);
};
