const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js');
const answersRouter = require('./answers.js');


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/question', questionsRouter)

router.use('/answers', answersRouter);



router.use


module.exports = router;
