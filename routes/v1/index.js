const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/employees', require('./employees'));

module.exports = router;
