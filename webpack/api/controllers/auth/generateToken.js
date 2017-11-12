const R = require('../../middleware/reusable');


module.exports = {

	token: (req, res) => {
		R.sign(req.params.id, (error, token) => {
			req.user = req.user ? req.user : {};
			req.user[req.params.id] = req.params.id;
			res.status(200).send({
				token: token,
				user: req.params.id,
			});
		});
	},

};
