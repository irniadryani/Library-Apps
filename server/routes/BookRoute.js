const express = require("express");
const router = require("express").Router();
const bookController = require('../controllers/BookController');
const { verifyUser } = require("../middleware/AuthUser");


router.get('/book/all-books', verifyUser ,bookController.getAllBooks);
router.get('/book/detail-book/:id',verifyUser, bookController.getBookById);
router.post('/book/insert-book', verifyUser, bookController.insertBook);
router.put('/book/update-book/:id', verifyUser, bookController.updateBook);
router.delete('/book/delete-book/:id', verifyUser, bookController.deleteBook);

module.exports = router;