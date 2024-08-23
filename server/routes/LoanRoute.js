const express = require("express");
const router = require("express").Router();
const loanController = require('../controllers/LoanController');
const { verifyUser } = require("../middleware/AuthUser");


router.get('/loan/all-loans', verifyUser, loanController.showLoanBook);
router.get('/loan/detail-loan/:id', verifyUser, loanController.getLoanById);
router.post('/loan/create-loan', verifyUser, loanController.createLoan);
router.put('/loan/return-book/:id', verifyUser, loanController.returnBook);

module.exports = router;