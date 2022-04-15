const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})