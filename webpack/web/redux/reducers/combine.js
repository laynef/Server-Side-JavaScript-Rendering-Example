import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';
// Custom Reducers
import userReducer from './user';
import messageReducer from './message';
import albumReducer from './album';
import notificationReducer from './notification';
import profileReducer from './profile';
import commentReducer from './comment';
import reviewReducer from './review';
import blogReducer from './blog';
import followerReducer from './followers';


export default combineReducers({
	reduxAsyncConnect,
	routing: routerReducer,
	form,
	user: userReducer,
	messages: messageReducer,
	albums: albumReducer,
	notifications: notificationReducer,
	profiles: profileReducer,
	comments: commentReducer,
	reviews: reviewReducer,
	blogs: blogReducer,
	followers: followerReducer,
});
