const express = require("express");
const router = require("express").Router();
const bookshelfController = require('../controllers/BookshelfController');
const { verifySession } = require("../middleware/AuthUser");

router.get('/bookshelf', bookshelfController.getBookshelf);

module.exports = router;