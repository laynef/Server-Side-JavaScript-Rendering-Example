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
	MessagingPage,
	ProfilePage,
	FileUploadsPage,
	ModelsPage,
	NotificationsPage,
	ReviewsPage,
	SearchPage,
	ShoppingPage,
	VideoChatPage,
	SelfHelpPage,
	SchedulerPage,
	BlackListingPage,
	RemovedPage,
	BlogPage,
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
	return (
		<Route path="/" component={MasterPage}>

			<Route onEnter={redirect}>
				<IndexRoute component={PublicPage} />
				<Route path="signup" component={SignUpPage} />
			</Route>

			<Route onEnter={requireLogin}>
				<Route path="dashboard" component={DashboardPage} />
				<Route path="profile" component={ProfilePage} />
				<Route path="messaging" component={MessagingPage} />
				<Route path="uploads" component={FileUploadsPage} />
				<Route path="notify" component={NotificationsPage} />
				<Route path="models" component={ModelsPage} />
				<Route path="reviews" component={ReviewsPage} />
				<Route path="search" component={SearchPage} />
				<Route path="shopping" component={ShoppingPage} />
				<Route path="video" component={VideoChatPage} />
				<Route path="schedule" component={SchedulerPage} />
				<Route path="help" component={SelfHelpPage} />
				<Route path="blog" component={BlogPage} />
				<Route path="black/list" component={BlackListingPage} />
			</Route>

			<Route path="removed" component={RemovedPage} />
			<Route path="*" component={NotFoundPage} />
		</Route>
	);
};
