const Message = require('../../../models/index').Message;
const R = require('../../middleware/reusable');
const notifyUI = require('../notification/ui').ui;
const getProfiles = require('../helpers/getProfiles').getProfiles;
const _ = require('lodash');


module.exports = {

	post: (req, res) => {
		Message.create(req.body)
			.then((response) => {
				let created = response.dataValues;
				// HARD CODED USER 1 NOTIFICATIONS
				notifyUI(1, created.userId, 'just sent a message');
				//  END HERE
				R.offset(`thread_${req.body.threadId}_count`, (count) => {
					let number = count + 1;
					R.setter(`thread_${req.body.threadId}_count`, number);
					R.getter(`thread_${req.body.threadId}_messages`,
						() => {
							getProfiles([created], 'userId', 'user', (object, array) => {
								R.setter(`thread_${req.body.threadId}_messages`, object);
								res.status(201).send(array);
							});
						},
						(cache) => {
							getProfiles([created], 'userId', 'user', (object, array) => {
								let fullCache = _.extend(object, cache);
								R.setter(`thread_${req.body.threadId}_messages`, fullCache);
								let returning = Object.values(cache).concat(array);
								res.status(201).send(returning);
							});
						});
				});
			})
			.catch(R.errorHandling);
	},

};
