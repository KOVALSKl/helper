const express = require('express')
const diseaseController = require('../controllers/diseaseController')
const router = express.Router()

router.get('/', diseaseController.all)
router.get('/:id', diseaseController.one)
router.post('/', diseaseController.create)

module.exports = router