import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';
// Custom Reducers
import userReducer from './user';


export default combineReducers({
	reduxAsyncConnect,
	routing: routerReducer,
	form,
	user: userReducer,
});
