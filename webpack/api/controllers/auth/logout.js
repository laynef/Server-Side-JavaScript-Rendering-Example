module.exports = {

	logout: (req, res) => {
		let id = req.headers.user;
		req.user[req.headers.user] = null;
		res.status(200).send({
			message: `Logged out user #${id}`,
		});
	},

};

