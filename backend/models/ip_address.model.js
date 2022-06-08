const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ipSchema = new Schema({
    ip_address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    date: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    }

},{
    timestamps:true,
}
);

const ip_addr = mongoose.model('ip_addr', ipSchema);

module.exports = ip_addr;

