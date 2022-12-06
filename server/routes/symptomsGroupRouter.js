const express = require('express');
const symptomsGroupController = require('../controllers/symptomsGroupController');

const router = express.Router();

router.get('/', symptomsGroupController.all);
router.get('/:id', symptomsGroupController.one);
router.post('/', symptomsGroupController.create);

module.exports = router;