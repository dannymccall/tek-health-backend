const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const doctorController = require("../controllers/doctor.controller");
const appointmentController = require("../controllers/appointment.controller");
const messageController = require("../controllers/message.controller");
const bloodController = require("../controllers/blood.controller");
router.post("/signup", userController.SignUp);

router.post("/signin", userController.SignIn);

router.post("/logout", userController.Logout);

router.post("/doctor-signup", doctorController.SignUp);
router.post("/doctor-signin", doctorController.SignIn);
router.get("/get-doctors", doctorController.getDoctors);
router.post("/doctor-logout", doctorController.Logout);
router.post("/add-appointment", appointmentController.addAppointment);

router.get("/get-appointments/:_id", appointmentController.getAppointments);
router.get("/get-all-appointments", appointmentController.getAllAppointments);

router.post("/send-message", messageController.postMessage);
router.get("/doctor-message/:doctorId", messageController.getDoctorMessages);
router.get("/patient-message/:patientId", messageController.getPatientMessages);
router.post("/add-blood", bloodController.addBlood);
module.exports = router;
