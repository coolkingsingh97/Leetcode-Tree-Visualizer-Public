const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const arraySchema = new Schema({
    arr: [{
        type: Number
    }]
},{
    timestamps:true,
}
);

const arr = mongoose.model('arr', arraySchema);

module.exports = arr;

