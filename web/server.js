import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from '../config/config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import morgan from 'morgan';
import path from 'path';
import createStore from './redux/store/create';
import cors from 'cors';
import http from 'http';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from './routes/router';
import parser from 'body-parser';
import { __HASHID__ } from './globals';
import sess from 'express-session';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';


let limiter = new RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	delayMs: 0, // disable delaying - full speed until the max limit is reached
});

// Express servers
const app = new Express();
const server = new http.Server(app);

// Middleware Functions
const shouldCompress = (req, res) => (req.headers['x-no-compression'] ? false : compression.filter(req, res));

const targetUrl = config.apiHost;
const proxy = httpProxy.createProxyServer({
	target: targetUrl,
	ws: true,
});

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/assets', Express.static(path.join(__dirname, '..', 'assets')));
app.use(Express.static(path.join(__dirname, '..', 'assets', 'dist')));
app.use(favicon(path.join(__dirname, '..', 'assets','img','favicon.ico')));
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true}));
app.use(parser.json());
app.use(parser.raw());
app.use(compression({ filter: shouldCompress }));
app.use(sess({
	secret: 'secret',
	saveUninitialized: true,
	resave: false,
	name: 'NewProject',
	cookie: {
		sameSite: true,
	},
}));

// Proxy Api
app.use('/api', (req, res) => {
	proxy.web(req, res, { target: targetUrl });
});
app.use('/ws', (req, res) => {
	proxy.web(req, res, { target: `${targetUrl}/ws` });
});
proxy.on('error', (error, req, res) => {
	res.status(500).render('500');
});
server.on('upgrade', (req, socket, head) => {
	proxy.ws(req, socket, head);
});

app.post('/set', (req, res) => {
	if (req.body.token) {
		req.session.redux[req.session.id] = req.body.redux;
		req.session.token[req.session.id] = req.body.token;
	} else {
		delete req.session.redux[req.session.id];
		delete req.session.token[req.session.id];
	}
	res.sendStatus(201);
});

// React
app.use((req, res) => {

	const memoryHistory = createHistory(req.originalUrl);
	const store = createStore(memoryHistory);
	const history = syncHistoryWithStore(memoryHistory, store);

	req.session.redux = req.session.redux  === undefined ? {} : req.session.redux;
	req.session.token = req.session.token  === undefined ? {} : req.session.token;

	let redux = !req.session.redux[req.session.id] ? store.getState() : req.session.redux[req.session.id];
	let token = !req.session.token[req.session.id] ? null : req.session.token[req.session.id];

	match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).render('500');
		} else if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			loadOnServer({ ...renderProps, store }).then(() => {
				const component = (
					<Provider store={store} key="provider">
						<ReduxAsyncConnect {...renderProps} />
					</Provider>
				);
				let id = __HASHID__;
				res.status(200).render('index', {
					reactApp: ReactDOM.renderToStaticMarkup(component),
					redux: JSON.stringify(redux),
					hashId: id,
					token: JSON.stringify(token),
				});
			})
				.catch(error => {
					console.error(`ERROR: `, error);
				});
		} else {
			res.status(404).render('404');
		}
	});
});

if (config.frontendPort) {
	server.listen(config.frontendPort, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> ✅  Your app is running, talking to API server on %s.', config.apiHost);
		console.info('==> 💻  Open %s in a browser to view the app.', config.host);
	});
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}
