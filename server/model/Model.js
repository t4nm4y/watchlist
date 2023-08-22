const mongoose = require('mongoose')

//Scheme
const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true,
    },
    category: {
        type:String,
            //movies, webseries, anime, animeMovie, animeSeries
        enum: ['M', 'S', 'A', 'AM', 'AS'], // Only these values are allowed
        required: true,
    },
    watchedDate: Date,
  });

// Model
const Watchlist = mongoose.model('Watchlist', movieSchema);

module.exports = Watchlist;