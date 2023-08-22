const express = require('express');
const { getAll, getMovies, getWebseries, getAnime, getAnimeMovie, getAnimeSeries, addMovie, updateMovie, deleteMovie } = require('../controllers/Controllers.js');
const router = express.Router()

router.get('/all', getAll)
router.get('/movies', getMovies)
router.get('/webseries', getWebseries)
router.get('/anime', getAnime)
router.get('/animeMovie', getAnimeMovie)
router.get('/animeSeries', getAnimeSeries)
router.post('/add', addMovie)
router.post('/update', updateMovie)
router.post('/delete', deleteMovie)

module.exports = router; 