const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: String,
    sex: String,
    dob: String,
    password: {
        type: String,
        required: true
    },
    incentives: {
        type: String,
        required: true,
        default: 0,
    },
    sales: {
        type: Number,
        required: true,
        default: 0,

    },
    bonus: {
        isBonus: {
            type: Boolean,
            default: false
        },
        bonusValue: {
            type: Number,
            default: 0,
        }

    },
    isHoliday:{
        type: Boolean,
        default: false
    },
    holiday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Holiday'
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
