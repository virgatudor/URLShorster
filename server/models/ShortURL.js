const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ShortURLSchema = new Schema({
    originalURL: {type: String, required: true,},
    shortenedURL: {type: String, required: true},
    creationDate: {type: Date, required: true},
    lastAccessDate: {type: Date, required: false},
    accessCounter: {type: Number, required: true}
});



module.exports = mongoose.model('ShortURL', ShortURLSchema);