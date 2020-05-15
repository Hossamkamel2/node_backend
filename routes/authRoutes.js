const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');

router.post('/login', authValidator.loginValidate, authController.login);

router.post('/verify', authController.verify);

router.post('/signup', authValidator.registerValidate, authController.signup);

router.get('/logout', isAuth, authController.logout);

module.exports = router;
