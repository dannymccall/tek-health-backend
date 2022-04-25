const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},
{

timestamps: true

})

module.exports = mongoose.model('Blood', bloodSchema);