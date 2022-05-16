const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    bloodCode: {
        type: String,
        required: true 
    }
},
{

timestamps: true

})

module.exports = mongoose.model('Blood', bloodSchema);