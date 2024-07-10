const router = require('express').Router();
const apiRouter = require('./api');
// require express router
// require api directory

// /api/*
router.use('/api', apiRouter);

// /*
router.use((req, res) => {
  return res.send('Invalid route.');
});

module.exports = router;
