const express = require('express')
const symptomsController = require('../controllers/symptomsController')
const router = express.Router()

router.get('/', symptomsController.all)
router.post('/', symptomsController.create)

module.exports = router