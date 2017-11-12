module.exports = {
	apiHost: 'http://localhost:8325',
	host: 'http://localhost:4000',
	apiBase: '/api/v1',
	apiPort: 8325,
	frontendPort: 4000,
	development: {
		"url": "postgres://liqicwzp:0yEE4PwPj5bwOZXzeLTEH86Ebszv8EMO@baasu.db.elephantsql.com:5432/liqicwzp",
		"dialect": "postgres",
	},
	webSecret: 'shhhh',
	redis: 'redis://localhost:6381',
	appRoot: __dirname,
};
