const express = require('express')
const doctorsController = require('../controllers/doctorsController')
const router = express.Router()

router.get('/', doctorsController.all)
router.get('/:id', doctorsController.one)
router.post('/', doctorsController.create)
router.put('/', doctorsController.update)
router.delete('/:id', doctorsController.delete)


module.exports = router