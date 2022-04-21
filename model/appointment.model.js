const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  dateOfAppointment: {
    type: Date,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointments", appointmentSchema);
