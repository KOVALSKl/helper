const express = require('express');
const router = express.Router();
const symptomsRouter = require('./symptomsRouter');
const diseasesRouter = require('./diseaseRouter');
const diagnoseRouter = require('./diagnoseRouter');
const doctorsRouter = require('./doctorsRouter');
const groupRouter = require('./groupRouter');

router.use('/symptoms', symptomsRouter);
router.use('/diseases', diseasesRouter);
router.use('/diagnose', diagnoseRouter);
router.use('/doctors', doctorsRouter);
router.use('/groups', groupRouter);

module.exports = router






