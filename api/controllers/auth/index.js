const login = require('./login').login;
const changePassword = require('./changePassword').changePassword;
const token = require('./generateToken').token;
const logout = require('./logout').logout;
const register = require('./register').register;


module.exports = {
	login,
	changePassword,
	token,
	logout,
	register,
};
