const constants = [
	'LOGIN',
	'LOGOUT',
	'REGISTER',
	'CHANGE_PASSWORD',
	'CHANGE_FORGOTTEN_PASSWORD',
	'GET_USER',
];

const data = constants.reduce((acc, item) => {
	acc[`${item}_PENDING`] = `${item}_PENDING`;
	acc[`${item}_SUCCESS`] = `${item}_SUCCESS`;
	acc[`${item}_ERROR`] = `${item}_ERROR`;
	return acc;
}, {});

export const  actionTypes = data;
