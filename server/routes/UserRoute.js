const express = require("express");
const router = require("express").Router();
const userController = require('../controllers/UserController');
const {  verifyUser } = require("../middleware/AuthUser");

router.get('/users/getAllUser', verifyUser, userController.getUsers);
router.post('/users/create-user',  userController.createUser);

module.exports = router;