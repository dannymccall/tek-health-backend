const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        max: 15
    },
    password: {
        type: String,
        required: true,
        max: 15
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    typeOfUser: {
        type: String,
        required: true
    },
    userStatus: {
        type: String,
        default: 'offline'
    },
    priorityCode: {
        type: String,
        default:'0'
    }
},
{
    timestamps:true

})

module.exports = mongoose.model("User", userSchema)