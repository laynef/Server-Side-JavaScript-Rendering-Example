import axios from 'axios';
import { actionTypes } from '../store/actionTypes';
import { browserHistory } from 'react-router';
import { apiHost, apiBase, host } from '../../../config/config';
import { getJSONHeader } from './token';


export function login(data) {
	return function(dispatch) {
		dispatch({ type: actionTypes.LOGIN_PENDING });
		axios.post(`${apiHost}${apiBase}/auth/local/login`, data)
			.then(response => {
				delete response.data.password;
				if (response.data.data.blackListed) {
					dispatch({
						type: actionTypes.LOGIN_SUCCESS,
						payload: response.data.data,
					});
					browserHistory.push('/removed');
					return;
				}
				dispatch({
					type: actionTypes.LOGIN_SUCCESS,
					payload: response.data.data,
				});
				window.__data.user.data = response.data.data;
				window.__token = response.data.token;
				axios.post(`${host}/set`, {
					redux: window.__data,
					token: response.data.token,
				});
				browserHistory.push('/dashboard');
			})
			.catch(error => {
				dispatch({
					type: actionTypes.LOGIN_ERROR,
					payload: error,
				});
			});
	};
};

export function changePassword(data, id) {
	return function(dispatch) {
		dispatch({ type: actionTypes.CHANGE_PASSWORD_PENDING });
		axios.patch(`${apiHost}${apiBase}/auth/local/change/password/${id}`, data, getJSONHeader())
			.then(response => {
				delete response.data.password;
				dispatch({
					type: actionTypes.CHANGE_PASSWORD_SUCCESS,
					payload: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: actionTypes.CHANGE_PASSWORD_ERROR,
					payload: error,
				});
			});
	};
};

export function logout(id) {
	return function(dispatch) {
		dispatch({ type: actionTypes.LOGOUT_PENDING });
		axios.get(`${apiHost}${apiBase}/auth/local/logout/${id}`, getJSONHeader())
			.then(response => {
				dispatch({
					type: actionTypes.LOGOUT_SUCCESS,
					payload: response.data,
				});
				window.__data.user.data = null;
				window.__token = null;
				axios.post(`${host}/set`, {
					redux: null,
					token: null,
				});
				browserHistory.push('/');
			})
			.catch(error => {
				dispatch({
					type: actionTypes.LOGOUT_ERROR,
					payload: error,
				});
			});
	};
};

export function register(data) {
	return function(dispatch) {
		dispatch({ type: actionTypes.REGISTER_PENDING });
		axios.post(`${apiHost}${apiBase}/auth/local/register/visitor`, data)
			.then(response => {
				delete response.data.password;
				if (response.data.data.blackListed) {
					dispatch({
						type: actionTypes.LOGIN_SUCCESS,
						payload: response.data.data,
					});
					browserHistory.push('/removed');
					return;
				}
				dispatch({
					type: actionTypes.REGISTER_SUCCESS,
					payload: response.data.data,
				});
				window.__data.user.data = response.data.data;
				window.__token = response.data.token;
				axios.post(`${host}/set`, {
					redux: window.__data,
					token: response.data.token,
				});
				browserHistory.push('/dashboard');
			})
			.catch(error => {
				dispatch({
					type: actionTypes.REGISTER_ERROR,
					payload: error,
				});
			});
	};
};
