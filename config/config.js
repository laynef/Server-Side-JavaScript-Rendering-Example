module.exports = {
	apiHost: 'http://localhost:8325',
	host: 'http://localhost:4000',
	apiBase: '/api/v1',
	apiPort: 8325,
	frontendPort: 4000,
	development: {
		"username": "laynefaler", // enter your own database
		"password": null,
		"database": "SSJS",
		"host": "127.0.0.1",
		"port": 5432,
		"dialect": "postgres",
	},
	webSecret: 'shhhh',
	redis: 'redis://localhost:6381',
	appRoot: __dirname,
};
