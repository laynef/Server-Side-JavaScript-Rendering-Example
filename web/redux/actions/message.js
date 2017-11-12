import axios from 'axios';
import { actionTypes } from '../store/actionTypes';
import { apiHost, apiBase, host } from '../../../config/config';
import { getJSONHeader } from './token';
import { extend } from 'lodash';


export function getMessages(id) {
	return function(dispatch) {
		dispatch({ type: actionTypes.GET_MESSAGES_PENDING });
		axios.get(`${apiHost}${apiBase}/chat/${id}`, getJSONHeader())
			.then((response) => {
				let format = {};
				format[`${id}`] = response.data.map(e => {
					if (e.profile && e.profile.password) {
						delete e.profile.password;
					}
					return e;
				});
				dispatch({
					type: actionTypes.GET_MESSAGES_SUCCESS,
					payload: format,
				});
				window.__data.messages.data = window.__data.messages.data === null ? format : extend(window.__data.messages.data, format);
				axios.post(`${host}/set`, {
					redux: window.__data,
					token: window.__token,
				});
			})
			.catch((error) => {
				dispatch({
					type: actionTypes.GET_MESSAGES_ERROR,
					payload: error,
				});
			});
	};
};

export function createMessage(data) {
	return function(dispatch) {
		dispatch({ type: actionTypes.CREATE_MESSAGES_PENDING });
		axios.post(`${apiHost}${apiBase}/chat`, data, getJSONHeader())
			.then((response) => {
				let format = {};
				format[`${data.threadId}`] = response.data.map(e => {
					if (e.profile && e.profile.password) {
						delete e.profile.password;
					}
					return e;
				});
				dispatch({
					type: actionTypes.CREATE_MESSAGES_SUCCESS,
					payload: format,
				});
				window.__data.messages.data = window.__data.messages.data === null ? format : extend(window.__data.messages.data, format);
				axios.post(`${host}/set`, {
					redux: window.__data,
					token: window.__token,
				});
			})
			.catch((error) => {
				dispatch({
					type: actionTypes.CREATE_MESSAGES_ERROR,
					payload: error,
				});
			});
	};
};

