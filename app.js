const Express = require('express');
const config = require('./config/config');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const parser = require('body-parser');
const router = require('./api/routes/index');
const auth = require('./api/middleware/reusable').authMiddleMan;
const sess = require('express-session');
const RedisStore = require('connect-redis')(sess);
const SwaggerExpress = require('swagger-express-mw');
const http = require('http');
const path = require('path');
let client = require('./api/caches/redis');

// Express servers
const app = new Express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
io.path('/ws');

// Middleware Functions
const shouldCompress = (req, res) => (req.headers['x-no-compression'] ? false : compression.filter(req, res));

// Middleware
SwaggerExpress.create({
	appRoot: __dirname, // required config
}, function(err, swaggerExpress) {
	if (err) { throw err; }
	swaggerExpress.register(app);

	app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));
	app.use(cors());
	app.use(morgan('dev'));
	app.use(parser.urlencoded({ extended: true}));
	app.use(parser.json());
	app.use(parser.raw());
	app.use(compression({ filter: shouldCompress }));
	app.use(sess({
		secret: 'secret',
		store: new RedisStore({ client: client, disableTTL: true }),
		saveUninitialized: true,
		resave: false,
		name: 'NewProject',
		cookie: {
			sameSite: true,
		},
	}));

	app.use(auth);
	app.use('/api/v1', router);

	if (config.apiPort) {
		let runnable = app.listen(config.apiPort, (err) => {
			if (err) {
				console.error(err);
			}
			console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
			console.info('==> 💻  Send requests to %s', config.apiHost);

			io.sockets.on('connection', (socket) => {

				socket.on('loginUser', (username) => {
					socket.broadcast.emit('onEnter', `${username} just joined.`);
				});

				socket.on('addNewMessage', (message) => {
					socket.broadcast.emit('addNewMessage', message);
				});

				socket.on('disconnect', () => {});
			});

			io.listen(runnable);
		});
	} else {
		console.error('==>     ERROR: No PORT environment variable has been specified');
	}

});
