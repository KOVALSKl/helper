const express = require('express')
const symptomsController = require('../controllers/symptomsController')
const router = express.Router()

router.get('/', symptomsController.all)
router.post('/', symptomsController.create)
router.put('/', symptomsController.update)
router.delete('/:id', symptomsController.delete)

module.exports = router