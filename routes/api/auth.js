const express = require('express');
const AuthController = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);
router.get('/current', authenticate, AuthController.getCurrent);

module.exports = router;
