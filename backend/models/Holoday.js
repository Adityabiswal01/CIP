const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default:Date.now()
    },
    Destination: {
        type: String,
        required: true
    },
    startingDate:{
        type: Date,
        required: true,
        default:Date.now()
    },
    endingDate:{
        type: Date,
        required: true,
        default:Date.now()
    },
    location: String,
    category:String,

    description: String
});


const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
