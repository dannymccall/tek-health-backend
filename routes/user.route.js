const express = require('express');

const router = express.Router();


const userController = require('../controllers/user.controller')

router.post('/signup', userController.SignUp);

router.post('/signin', userController.SignIn);

router.post('logout', userController.Logout);


module.exports = router