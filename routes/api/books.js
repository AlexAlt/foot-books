const express = require('express');
const router = express.Router();
const booksController = require ('../../controllers/booksController');

router.post('/', booksController.handleNewBook);

module.exports = router;
