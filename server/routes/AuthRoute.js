const express = require("express");
const router = require("express").Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.login);
router.get('/me', authController.me);
router.delete('/logout', authController.logout);

module.exports = router;