const client = require('../caches/redis');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


module.exports = {

	auth: (req, res, method) => {
		req.user = req.user ? req.user : {};
		if (req.user[req.headers.user]) {
			method(req, res);
		} else {
			res.status(403).send({
				message: "Unauthorization User",
			});
		}
	},

	sign: (userId, cb) => {
		jwt.sign(
			{ user: userId },
			config.webSecret,
			cb
		);
	},

	dictionaryById: (array) => {
		let dictionary = {};
		array.forEach(e => {
			dictionary[e.id] = e;
		});
		return dictionary;
	},

	addCamelCase: (serialResponseArray, prefix) => {
		return serialResponseArray.map(element => {
			let object = {};
			_.each(element, (value, key) => {
				let keys = key.charAt(0).toUpperCase() + key.slice(1);
				let withPrefix = prefix + keys;
				object[withPrefix] = value;
			});
			return object;
		});
	},

	serialResponse: (response) => {
		return response.map(e => e.dataValues);
	},

	offset: (term, cb) => {
		client.get(term, (error, reply) => {
			/* eslint-disable */
			if (error) {
                console.error({
                    message: 'Caching error on string: ' + term,
                    error: error,
				})
				res.status(401).send({
                    message: 'Caching error on string: ' + term,
                    error: error,
				});
            }
            /* eslint-enable */
			let count = reply === null ? 0 : Number(reply);
			cb(count);
		});
	},

	/* eslint-disable */
    errorHandling: (error) => {
        console.error({message: error});
        res.status(404).send({
            message: error,
        })
    },
    /* eslint-enable */

	authMiddleMan: (req, res, next) => {
		if (req.headers && req.headers.authorization && req.headers.user)  {
			jwt.verify(req.headers.authorization, config.webSecret, (error, decoded) => {
				req.user = req.user ? req.user : {};
				if (error) {
					req.user[req.headers.user]  = null;
				} else {
					req.user[req.headers.user] = decoded.user;
				}
				next();
			});
		} else {
			next();
		}
	},

	setter: (term, data) => {
		client.set(term, JSON.stringify(data));
	},

	getter: (term, query, cached) => {
		client.get(term, (error, reply) => {
			/* eslint-disable */
			if (error) {
                console.error({
                    message: 'Caching error on string: ' + term,
                    error: error,
				})
				res.status(401).send({
                    message: 'Caching error on string: ' + term,
                    error: error,
				});
            }
            /* eslint-enable */
			if (reply === null) {
				query();
			} else {
				let cache = JSON.parse(reply);
				cached(cache);
			}
		});
	},

};
