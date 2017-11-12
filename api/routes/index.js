const router = require('express').Router();
// controllers
const controllers = require('../controllers/index');
// middle-wares
const auth = require('../middleware/reusable').auth;

// Routes here

// For Dev Only
router.get('/get/token/:id', controllers.auth.token);

// auth
router.post('/auth/local/login', controllers.auth.login);
router.post('/auth/local/register/admin', controllers.auth.register(0).post);
router.post('/auth/local/register/guest', controllers.auth.register(1).post);
router.post('/auth/local/register/visitor', controllers.auth.register(2).post);

// user
router.get('/auth/local/logout/:id', (req, res) => auth(req, res, controllers.auth.logout));
router.patch('/auth/local/change/password/:id', (req, res) => auth(req, res, controllers.auth.changePassword));


module.exports = router;
