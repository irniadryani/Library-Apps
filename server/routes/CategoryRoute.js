const express = require("express");
const router = require("express").Router();
const categoryController = require('../controllers/CategoryController');
const { verifySession } = require("../middleware/AuthUser");

router.get('/category', categoryController.getCategory);

module.exports = router;