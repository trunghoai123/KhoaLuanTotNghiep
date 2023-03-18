const express = require('express');
const accountController = require('../../controllers/account.controller');
const router = express.Router()

router.post('/signUp' , accountController.signUp)
router.post('/signIn' , accountController.signIn)

module.exports = router