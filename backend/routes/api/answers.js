const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Question, Vote, Answer } = require('../../db/models');

const router = express.Router();




//Make validators
const answerValidators = [
  check('userInput')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for userInput')
    .isLength({ max: 100 }),
]



// GET: all answers by question PK

// GET: create answer form

// GET: answer by specific PK

// POST: post question

// PUT or POST: update question by PK

// DELETE: delete question by PK

// GET: all votes for specific answer

// DELETE: delete/remove vote

module.exports = router;
