const express = require('express');
const symptomsGroupController = require('../controllers/symptomsGroupController');
const groupRouter = require('./symptomsGroupRouter');

const router = express.Router();

router.get('/', symptomsGroupController.all);
router.get('/:id', symptomsGroupController.one);
router.post('/', symptomsGroupController.create);
router.put('/', symptomsGroupController.update);
router.delete('/:id', symptomsGroupController.delete);

module.exports = router;