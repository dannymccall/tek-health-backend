const express = require('express');

const router = express.Router();


const userController = require('../controllers/user.controller')
const doctorController = require('../controllers/doctor.controller')
router.post('/signup', userController.SignUp);

router.post('/signin', userController.SignIn);

router.post('/logout', userController.Logout);

router.post('/doctor-signup', doctorController.SignUp);
router.post('/doctor-signin', doctorController.SignIn);
router.get('/get-doctors', doctorController.getDoctors);

module.exports = router