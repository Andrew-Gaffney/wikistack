const express = require('express')

var router = express.Router();
var wikiRouter = require('./wiki.js');
var userRouter = require('./user.js');

router.use('/wiki', wikiRouter);
router.use('/users', userRouter)

module.exports = router;
