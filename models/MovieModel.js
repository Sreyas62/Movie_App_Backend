const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    body: {type: String, required: true},
    rating: {type: Number, required: true},
    user: {type: String, required: true},
},{
    versionKey: false
})

const MovieModel = mongoose.model('movie', movieSchema);

module.exports = {
    MovieModel,
}