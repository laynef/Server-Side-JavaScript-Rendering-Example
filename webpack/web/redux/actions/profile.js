import axios from 'axios';
import { actionTypes } from '../store/actionTypes';
import { apiHost, apiBase, host } from '../../../config/config';
import { getJSONHeader } from './token';
import { extend } from 'lodash';


export function getProfile(id) {
	return function(dispatch) {
		dispatch({ type: actionTypes.GET_PROFILE_PENDING });
		axios.get(`${apiHost}${apiBase}/profile/${id}`, getJSONHeader())
			.then((response) => {
				let format = {};
				format[`${id}`] = response.data;
				dispatch({
					type: actionTypes.GET_PROFILE_SUCCESS,
					payload: format,
				});
				window.__data.profiles.data = window.__data.profiles.data === null ? format : extend(window.__data.profiles.data, format);
				axios.post(`${host}/set`, {
					redux: window.__data,
					token: window.__token,
				});
			})
			.catch((error) => {
				dispatch({
					type: actionTypes.GET_PROFILE_ERROR,
					payload: error,
				});
			});
	};
}
