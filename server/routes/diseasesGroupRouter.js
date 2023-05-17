const express = require('express')
const diseasesGroupController = require('../controllers/diseasesGroupController')
const router = express.Router()

router.get('/', diseasesGroupController.all)
router.get('/:id', diseasesGroupController.one)
router.post('/', diseasesGroupController.create)
router.put('/', diseasesGroupController.update)
router.delete('/:id', diseasesGroupController.delete)


module.exports = router