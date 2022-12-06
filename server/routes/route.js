const express = require('express');
const router = express.Router();
const symptomsRouter = require('./symptomsRouter');
const diseasesRouter = require('./diseaseRouter');
const diagnoseRouter = require('./diagnoseRouter');
const groupRouter = require('./symptomsGroupRouter');

router.use('/symptoms', symptomsRouter);
router.use('/diseases', diseasesRouter);
router.use('/diagnose', diagnoseRouter);
router.use('/groups', groupRouter);

module.exports = router