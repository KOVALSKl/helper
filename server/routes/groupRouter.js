const express = require('express');
const router = express.Router();

// ROUTERS
const symptomsGroupRouter = require('./symptomsGroupRouter');
const diseasesGroupRouter = require('./diseasesGroupRouter');
const riskGroupsRouter = require('./riskGroupsRouter');

router.use('/symptoms', symptomsGroupRouter);
router.use('/diseases', diseasesGroupRouter);
router.use('/risks', riskGroupsRouter);

module.exports = router;