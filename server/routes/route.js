const express = require('express');
const router = express.Router();
const symptomsRouter = require('./symptomsRouter');
const diseasesRouter = require('./diseaseRouter');

router.use('/symptoms', symptomsRouter);
router.use('/diseases', diseasesRouter);

module.exports = router