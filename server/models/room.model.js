const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true},
    capacity: { type: Number, required: true},
    amenities: [String]
});

module.exports = mongoose.model('Room', roomSchema);