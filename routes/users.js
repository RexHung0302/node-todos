var express = require('express');
var router = express.Router();
const csrfProtection = require('../config/csrf');
const userController = require('../controllers/user');
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({ extended: false });
const { check, body, validationResult } = require('express-validator');

router.get('/login', userController.getLoginHandler);

router.post('/login', [ 
  check('email', 'Email is required').notEmpty(),
  body('email', 'Incorrect Email format').isEmail(),
  check('password', 'Password is required').notEmpty(),
 ], parseForm, userController.loginHandler);

router.get('/logout', userController.logoutHandler);

router.get('/sign-up', userController.getSignUpHandler);

router.post('/sign-up', [ 
  check('email', 'Email is required').notEmpty(),
  body('email', 'Incorrect Email format').isEmail(),
  check('password').trim().isLength({ min: 6 }).withMessage('Password is required or Incorrect Password format'),
  check('confirm_password').custom((val, {req}) => {
    if (val !== req.body.password) {
      // 驗證失敗時的錯誤訊息
      throw new Error('Confirm Password is different than Password')
    }
    if(!val) {
      throw new Error('Confirm Password is required')
    }
    // 成功驗證回傳 true
    return true
  }),
 ], parseForm, userController.signUpHandler);

module.exports = router;