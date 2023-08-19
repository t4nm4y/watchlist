const express = require('express');
const { getList, addMovie, updateMovie, deleteMovie } = require('../controllers/Controllers.js');
const router = express.Router()

router.get('/', getList)
router.post('/add', addMovie)
router.post('/update', updateMovie)
router.post('/delete', deleteMovie)

module.exports = router; 