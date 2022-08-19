const router = require('express').Router();

const authController = require('../controller/authController')

router.post('/register', authController.Register);
router.post('/login', authController.Login);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/forgotpasswordconfirm', authController.forgotPasswordConfirm);

module.exports = router;