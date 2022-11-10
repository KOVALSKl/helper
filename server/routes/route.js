const express = require('express');
const router = express.Router();
const symptomsRouter = require('./symptomsRouter');
const diseasesRouter = require('./diseaseRouter');
const diagnoseRouter = require('./diagnoseRouter');

router.use('/symptoms', symptomsRouter);
router.use('/diseases', diseasesRouter);
router.use('/diagnose', diagnoseRouter);

module.exports = router