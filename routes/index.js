const express = require('express');
const neo4jRouter = require('./neo4j');
const redisGraphRouter = require('./redisgraph');
const amazonNeptuneRouter = require('./neptune');

const router = express.Router();
router.use('/neo4j', neo4jRouter);
router.use('/redisgraph', redisGraphRouter);
router.use('/neptune', amazonNeptuneRouter);

module.exports = router;
