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
        required: true,
    },
    watchedDate: Date,
  });

// Model
const Watchlist = mongoose.model('Watchlist', movieSchema);

module.exports = Watchlist;