const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { csrfProtection, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Question, Vote, Answer, Topic } = require('../../db/models');

const router = express.Router();




//Make validators
const questionValidator = [
  check('userInput')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for userInput')
    .isLength({ max: 100 }),
  check('topic')
    .exists({ checkFalsy: true })
    .withMessage('Please choose a topic')
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
  csrfProtection,
  asyncHandler( async(req, res, next) => {
    const questions = await Question.findAll({
      include: [
        User,
        Topic,
        Vote,
        Answer
      ]
    })
    return res.json({ questions })
  })
)
// GET: all questions by for specific user
router.get(
  '/',
  requireAuth,
  csrfProtection,
  questionValidator,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await findByPk(questionId)
  })
)

// GET: question by specific PK
router.get(
  '/',
  requireAuth,
  csrfProtection,
  questionValidator,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await findByPk(questionId)
  })
)
// GET: create question form
router.get(
  '/new',
  requireAuth,
  csrfProtection,
  questionValidator,
  asyncHandler( async(req, res, next) => {
    const topics = await Topic.findAll()
  })
)
// POST: post question
router.post(
  '/',
  requireAuth,
  csrfProtection,
  questionValidator,
  asyncHandler( async(req, res, next) => {
   
  })
)

// PUT or POST: update/edit specific question by PK
router.put(
  '/',
  requireAuth,
  csrfProtection,
  questionValidator,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await findByPk(questionId)
  
    return res.json({ question }) 
  })
)

// DELETE: delete specific question by PK
router.delete(
  '/:id',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const questionId = parseInt( req.params.id, 10)
    const question = await Question.findByPk(questionId);
    return res.json({ question })
  })
)
module.exports = router;
