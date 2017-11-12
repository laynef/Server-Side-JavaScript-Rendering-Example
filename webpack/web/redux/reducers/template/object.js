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
		case actionTypes.GET_BLANK_PENDING:
			return {
				...state,
				pending: true,
				error: null,
			};

		case actionTypes.GET_BLANK_SUCCESS:
			data = state.data == null ? {} : state.data;
			return {
				...state,
				pending: null,
				error: null,
				data: extend({}, data, action.payload),
			};

		case actionTypes.GET_BLANK_ERROR:
			return {
				...state,
				pending: null,
				error: action.payload,
			};

		case actionTypes.CREATE_BLANK_PENDING:
			return {
				...state,
				pending: true,
				error: null,
			};

		case actionTypes.CREATE_BLANK_SUCCESS:
			data = state.data == null ? {} : state.data;
			return {
				...state,
				pending: null,
				error: null,
				data: extend({}, data, action.payload),
			};

		case actionTypes.CREATE_BLANK_ERROR:
			return {
				...state,
				pending: null,
				error: action.payload,
			};

	}

	return state;
};

