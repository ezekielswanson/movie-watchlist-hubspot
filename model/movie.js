const mongoose = require('mogoose');
const Schema = mongoose.schema;


//Schema
const movieSchema = new Schema({
    Poster: { type: String, required: true },
    Title: { type: String, required: true },
    imdbRating: { type: String, required: true },
    Runtime: { type: String, required: true },
    Genre: { type: String, required: true },
    imdbID: { type: String, required: true, unique: true },
    Plot: { type: String, required: true },
  }, { timestamps: true });



  module.exports = mongoose.model('Movie', movieSchema);