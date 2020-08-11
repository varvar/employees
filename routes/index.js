const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(
    `Hi There! Running ${process.env.NODE_ENV || 'development'} environment`
  );
});

router.use('/api/v1/', require('./v1'));

module.exports = router;
