const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    doctorName: {
        type:String,
        required:true
    },
    bloodType: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('Orders', ordersSchema)