var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/auth');
const indexController = require('../controllers/index');
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({ extended: false });
const { check, body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', checkAuth.verifyAuth, indexController.getTodos);

router.get('/newTask', checkAuth.verifyAuth, indexController.getNewTask);

router.post('/newTask', checkAuth.verifyAuth, [
    check('title', 'Title is required').notEmpty(),
    check('expiry', 'Expiry is required').notEmpty(),
    check('content', 'Content is required').notEmpty(),
], parseForm, indexController.postNewTask);

router.post('/deleteTodo', checkAuth.verifyAuth, indexController.deleteTodo);

router.get('/editTask/:id', checkAuth.verifyAuth, indexController.getEditTask);

router.post('/editTask/:id', checkAuth.verifyAuth, [
    check('title', 'Title is required').notEmpty(),
    check('expiry', 'Expiry is required').notEmpty(),
    check('content', 'Content is required').notEmpty(),
], indexController.postEditTask);

router.post('/changeStatus', checkAuth.verifyAuth, indexController.changeStatus)

module.exports = router;
