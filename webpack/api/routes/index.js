const router = require('express').Router();
// controllers
const controllers = require('../controllers/index');
// middle-wares
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
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

// chat
router.get('/chat/:id', (req, res) => auth(req, res, controllers.messaging.get));
router.post('/chat', (req, res) => auth(req, res, controllers.messaging.post));

// file uploads
router.post('/images/album/:albumId/user/:userId', upload.single('file'), (req, res) => auth(req, res, controllers.uploads.files(0).post));
router.post('/video/album/:albumId/user/:userId', upload.single('file'), (req, res) => auth(req, res, controllers.uploads.files(1).post));
router.post('/audio/album/:albumId/user/:userId', upload.single('file'), (req, res) => auth(req, res, controllers.uploads.files(2).post));

// albums
router.get('/album/:id', (req, res) => auth(req, res, controllers.album.get));
router.post('/album', (req, res) => auth(req, res, controllers.album.post));

// notifications
router.get('/notifications/:id', (req, res) => auth(req, res, controllers.notification.get));

// discounts
router.get('/verify/discount/:code', (req, res) => auth(req, res, controllers.discount.get));
router.post('/verify/discount', (req, res) => auth(req, res, controllers.discount.post));
router.patch('/verify/discount/:code', (req, res) => auth(req, res, controllers.discount.patch));

// profile
router.get('/profile/:id', (req, res) => auth(req, res, controllers.profile.get));
router.patch('/profile/:id', (req, res) => auth(req, res, controllers.profile.update));

// black list
router.get('/black/list', (req, res) => auth(req, res, controllers.blacklist.getAll));
router.get('/black/list/:id', (req, res) => auth(req, res, controllers.blacklist.get));
router.post('/black/list', (req, res) => auth(req, res, controllers.blacklist.post));
router.patch('/black/list', (req, res) => auth(req, res, controllers.blacklist.patch));

// help tickets
router.get('/help/ticket', (req, res) => auth(req, res, controllers.helpticket.getAll));
router.get('/help/ticket/:id', (req, res) => auth(req, res, controllers.helpticket.get));
router.post('/help/ticket', (req, res) => auth(req, res, controllers.helpticket.post));
router.patch('/help/ticket/:id', (req, res) => auth(req, res, controllers.helpticket.patch));
router.delete('/help/ticket/:id', (req, res) => auth(req, res, controllers.helpticket.deletes));

// reviews
router.get('/review/one/:id', (req, res) => auth(req, res, controllers.reviews.get));
router.get('/review/:id', (req, res) => auth(req, res, controllers.reviews.getAll));
router.post('/review', (req, res) => auth(req, res, controllers.reviews.post));
router.patch('/review/:id', (req, res) => auth(req, res, controllers.reviews.patch));
router.delete('/review/:id/user/:otherId', (req, res) => auth(req, res, controllers.reviews.deletes));

// comments
router.get('/review/comment/one/:id', (req, res) => auth(req, res, controllers.comment.get));
router.get('/review/:reviewId/comment', (req, res) => auth(req, res, controllers.comment.getAll));
router.patch('/review/:reviewId/comment/:id', (req, res) => auth(req, res, controllers.comment.patch));
router.post('/review/:reviewId/comment', (req, res) => auth(req, res, controllers.comment.post));
router.delete('/review/:reviewId/comment/:id', (req, res) => auth(req, res, controllers.comment.deletes));

// availability
router.get('/availability/one/:id', (req, res) => auth(req, res, controllers.availability.get));
router.get('/user/:userId/availability', (req, res) => auth(req, res, controllers.availability.getAll));
router.patch('/user/:userId/availability/:id', (req, res) => auth(req, res, controllers.availability.patch));
router.post('/user/:userId/availability', (req, res) => auth(req, res, controllers.availability.post));
router.delete('/user/:userId/availability/:id', (req, res) => auth(req, res, controllers.availability.deletes));

// followers
router.get('/followers/:id', (req, res) => auth(req, res, controllers.follower.getFollowers));
router.get('/following/:id', (req, res) => auth(req, res, controllers.follower.getFollowing));
router.post('/following', (req, res) => auth(req, res, controllers.follower.post));
router.patch('/following/:id', (req, res) => auth(req, res, controllers.follower.patch));
router.delete('/following/:id/user/:userId', (req, res) => auth(req, res, controllers.follower.deletes));

// blogs
router.get('/blog/one/:id', (req, res) => auth(req, res, controllers.blog.get));
router.get('/blog/user/:userId', (req, res) => auth(req, res, controllers.blog.getAll));
router.post('/blog/user', (req, res) => auth(req, res, controllers.follower.post));
router.patch('/blog/:id/user/:userId', (req, res) => auth(req, res, controllers.follower.patch));
router.delete('/blog/:id/user/:userId', (req, res) => auth(req, res, controllers.follower.deletes));

// user
router.get('/user/:id', (req, res) => auth(req, res, controllers.user.get));


module.exports = router;
