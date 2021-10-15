const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { User, Question, Vote, Answer, Topic } = require('../../db/models');

const router = express.Router();




//Make validators
const questionValidator = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for userInput')
    .isLength({ max: 100 }),
  check('topic')
    .exists({ checkFalsy: true })
    .withMessage('Please choose a topic')
]

const answerValidators = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for userInput')
]
// Checking permissions

const checkPermissions = (question, currentUser) => {
  if (question.userId !== currentUser.id ) {
    const err = new Error('Illegal operation.');
    err.status = 403;
    throw err;
  }
};


// GET: all questions
router.get(
  '/',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questions = await Question.findAll({
      include: [
        User,
        Topic,
        Answer
      ]
    })
    return res.json(questions)
  })
)
// GET: all questions by for specific user
router.get(
  '/',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await findByPk(questionId)

    return res.json(question)
  })
  
)

// GET: question by specific PK
router.get(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await findByPk(questionId, {
      where: questionId,
      order: [["createdAt", "DESC"]],
      include: User
    });

    return res.json(question)
  })
)
// GET: create question form
router.get(
  '/new',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const topics = await Topic.findAll()

    return res.json(topics)
  })
)
// POST: post question
router.post(
  '/',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const {
      body,
      topic
    } = req.body;

    const question = await Question.create({
      userId: req.user.id,
      topicId: topic,
      body,
    })
    
    res.json(question);
    // const validatorErrors = validationResult(req)

    // if(validatorErrors.isEmpty()) {
    //   await question.save();
    //   res.redirect('/')
    // } else {
    //   const topics = await Topic.findAll();
    //   const errors = validatorErrors.array().map((error) => error.msg);
    // }
  })
)

// PUT or POST: update/edit specific question by PK
router.put(
  '/edit/:id(\\d+)',
  requireAuth,
  questionValidator,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await findByPk(questionId)
    const {
      body,
      topic,
    } = req.body;

    checkPermissions(question, res.locals.user)
    
    question.update({
      body,
      topicId: topic
    })

    return res.json(question) 
  })
)

// DELETE: delete specific question by PK
router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await Question.findByPk(questionId);

    checkPermissions(question, res.locals.user)

    await question.destroy();

    return res.json(question)
  })
)

// POST: adding answer to specific question
router.post(
  '/:id(\\d+)/answer',
  requireAuth,
  answerValidators,
  asyncHandler( async(req, res, next) => {
    const { body } = req.body;
    const theQuestionId = parseInt( req.params.id, 10)
    const addAnswer = await Answer.build({
      userId: req.user.id,
      body,
      questionId: theQuestionId
    })

    return res.json(addAnswer)
  })
)

module.exports = router;
