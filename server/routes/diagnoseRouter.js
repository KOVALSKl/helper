const express = require('express')
const diagnoseController = require('../controllers/diagnoseController')
const router = express.Router();

router.post('/', diagnoseController.make)

module.exports = router;