const express = require('express');
const AuthController = require('../../controllers/auth');
const { authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../schemas');
const validateBody = require('../../middlewares/validateBody');

const router = express.Router();

router.post('/register', validateBody(schemas.userRegisterSchema), AuthController.register);
router.post('/login', validateBody(schemas.userLoginSchema), AuthController.login);
router.post('/logout', authenticate, AuthController.logout);
router.get('/current', authenticate, AuthController.getCurrent);
router.patch('/avatars', authenticate, upload.single('avatar'), AuthController.updateAvatar)

module.exports = router;
