const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    body('fullName').isLength({min: 3, max: 32}),
    userController.registration
);
router.get('/test', (_req, res) => {
    res.send("Test")
});
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/activate', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/me', authMiddleware, userController.getMe);

module.exports = router
