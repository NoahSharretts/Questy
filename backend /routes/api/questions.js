const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Question, Vote, Answer } = require('../../db/models');

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



// GET: all questions
router.get(
  '/',
  requireAuth,
  asyncHandler( async(req, res) => {
    const questions = await Question.findAll({
      include: [
        
      ]
    })
  })
)
// GET: all questions by for specific user

// GET: question by specific PK

// GET: create question form

// POST: post question

// PUT or POST: update/edit specific question by PK

// DELETE: delete specific question by PK

module.exports = router;
