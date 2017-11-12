const Message = require('../../../models/index').Message;
const _ = require('lodash');
const R = require('../../middleware/reusable');
const getProfiles = require('../helpers/getProfiles').getProfiles;


module.exports = {

	get: (req, res) => {
		R.offset(`thread_${req.params.id}_count`, (count) => {
			Message.findAll({
				where: { threadId: req.params.id },
				offset: count,
			})
				.then((response) => {
					let messages = R.serialResponse(response);
					R.getter(`thread_${req.params.id}_messages`,
						() => {
							if (messages.length > 0) {
								getProfiles(messages, 'userId', 'user', (setCache, messageData) => {
									R.setter(`thread_${req.params.id}_messages`, setCache);
									R.setter(`thread_${req.params.id}_count`, messageData.length);
									res.status(200).send(messageData);
								});
							} else {
								res.status(200).send([]);
							}
						},
						(cache) => {
							if (messages.length > 0) {
								getProfiles(messages, 'userId', 'user', (setCache, messageData) => {
									let all = _.extend(cache, setCache);
									R.setter(`thread_${req.params.id}_messages`, all);
									R.setter(`thread_${req.params.id}_count`, messages.length + count);
									let returning = Object.values(cache).concat(messageData);
									res.status(200).send(returning);
								});
							} else {
								res.status(200).send(Object.values(cache));
							}
						});
				})
				.catch(R.errorHandling);
		});
	},

};
