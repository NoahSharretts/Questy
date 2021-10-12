const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Question, Vote, Answer } = require('../../db/models');

const router = express.Router();




//Make validators




// GET: all questions

// GET: all questions by for specific user

// GET: question by specific PK

// GET: create question form

// POST: post question

// PUT or POST: update/edit specific question by PK

// DELETE: delete specific question by PK

module.exports = router;
