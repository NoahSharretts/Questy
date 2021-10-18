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
  if (question.dataValues.userId !== currentUser.id ) {
    const err = new Error('Illegal operation.');
    err.status = 403;
    throw err;
  }
};


// GET: all questions
router.get(
  '/',
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
// router.get(
//   '/',
//   asyncHandler( async(req, res, next) => {
//     const questionId = parseInt( req.params.id, 10)
//     const question = await Question.findByPk(questionId)

//     return res.json(question)
//   })
  
// )

// GET: question by specific PK
router.get(
  '/:id(\\d+)',
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await Question.findByPk(questionId, {
      include: [
        User,
        Topic,
        Answer
      ]
    });
    res.json(question)
  })
)
// GET: create question form
router.get(
  '/new',
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
  })
)

// PUT or POST: update/edit specific question by PK
router.put(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questionId =  req.params.id
    const question = await Question.findByPk(questionId)
    const {
      body,
      topic,
    } = req.body;

    checkPermissions(question, req.user)
    question.update({
      topicId: topic,
      body,
    })

    res.json(question) 
  })
)

// DELETE: delete specific question by PK
router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findByPk(questionId);

    checkPermissions(question, req.user)

    await question.destroy();
    return res.json(questionId)
  })
)

// POST: adding answer to specific question
router.post(
  '/:id(\\d+)/answers',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const { body } = req.body;
    const theQuestionId = parseInt( req.params.id, 10)
    const addAnswer = await Answer.create({
      userId: req.user.id,
      body,
      questionId: theQuestionId
    })
    return res.json(addAnswer)
  })
)

// GET: all answers with specific question
router.get(
  '/:id(\\d+)/answers',
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const answers = await Answer.findAll({
      where: {
        questionId
      },
      include: [
        User
      ]
    });
    res.json(answers)
  })
)


module.exports = router;
