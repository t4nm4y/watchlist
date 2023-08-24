const express = require('express');
const { login, searchByTitle,getAll, getMovies, getWebseries, getAnime, getAnimeMovie, getAnimeSeries, addMovie, updateMovie, deleteMovie } = require('../controllers/Controllers.js');
const router = express.Router()
const auth = require('../middleware/auth.js')
const jwtAuth = require('../middleware/jwtAuth.js')

router.post('/login',auth, login)
router.get('/all', getAll)
router.get('/movies', getMovies)
router.get('/webseries', getWebseries)
router.get('/anime', getAnime)
router.get('/animeMovie', getAnimeMovie)
router.get('/animeSeries', getAnimeSeries)
router.post('/search', searchByTitle)

//use auth for sepcific routes
router.post('/add', jwtAuth, addMovie)
router.post('/update', jwtAuth, updateMovie)
router.post('/delete', jwtAuth, deleteMovie)

module.exports = router;