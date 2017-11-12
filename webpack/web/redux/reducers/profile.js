import { actionTypes } from '../store/actionTypes';
import { extend } from 'lodash';


const INITIAL_STATE = {
	pending: null,
	error: null,
	data: null,
};

export default function (state = INITIAL_STATE, action) {
	let data = null;
	switch (action.type) {
		case actionTypes.GET_PROFILE_PENDING:
			return {
				...state,
				pending: true,
				error: null,
			};

		case actionTypes.GET_PROFILE_SUCCESS:
			data = state.data == null ? {} : state.data;
			return {
				...state,
				pending: null,
				error: null,
				data: extend({}, data, action.payload),
			};

		case actionTypes.GET_PROFILE_ERROR:
			return {
				...state,
				pending: null,
				error: action.payload,
			};

		case actionTypes.UPDATE_PROFILE_PENDING:
			return {
				...state,
				pending: true,
				error: null,
			};

		case actionTypes.UPDATE_PROFILE_SUCCESS:
			data = state.data == null ? {} : state.data;
			return {
				...state,
				pending: null,
				error: null,
				data: extend({}, data, action.payload),
			};

		case actionTypes.UPDATE_PROFILE_ERROR:
			return {
				...state,
				pending: null,
				error: action.payload,
			};

	}

	return state;
};

