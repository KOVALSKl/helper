const express = require('express')
const riskGroupsController = require('../controllers/riskGroupController')
const router = express.Router()

router.get('/', riskGroupsController.all)
router.get('/:id', riskGroupsController.one)
router.post('/', riskGroupsController.create)
router.put('/', riskGroupsController.update)
router.delete('/:id', riskGroupsController.delete)


module.exports = router