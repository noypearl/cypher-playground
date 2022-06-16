const express = require('express');
const neo4jRouter = require('./neo4j');
const redisGraphRouter = require('./redisgraph');

const router = express.Router();
router.use('/neo4j', neo4jRouter);
router.use('/redisgraph', redisGraphRouter);

module.exports = router;
