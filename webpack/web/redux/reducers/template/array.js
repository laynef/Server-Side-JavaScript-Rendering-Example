import { actionTypes } from '../store/actionTypes';


const INITIAL_STATE = {
	pending: null,
	error: null,
	data: null,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case actionTypes.GET_BLANK_PENDING:
			return {
				...state,
				pending: true,
				error: null,
			};

		case actionTypes.GET_BLANK_SUCCESS:
			return {
				...state,
				pending: null,
				error: null,
				data: action.payload,
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
			return {
				...state,
				pending: null,
				error: null,
				data: action.payload,
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

