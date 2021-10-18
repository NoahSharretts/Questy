const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Question, Vote, Answer } = require('../../db/models');

const router = express.Router();




//Make validators
const answerValidators = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for userInput')
]

// Check permissions
const checkPermissions = (question, currentUser) => {
  if (question.dataValues.userId !== currentUser.id ) {
    const err = new Error('Illegal operation.');
    err.status = 403;
    throw err;
  }
};

router.put(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const answerId = parseInt( req.params.id, 10)
    console.log(answerId)
    const { body } = req.body;
    const answer = await Answer.findByPk(answerId)

    checkPermissions(answer, req.user)
    
    answer.update({ body })

    return res.json(answer) 
  })
)

router.delete(
  '/:id(\\d+)',
  requireAuth,
  asyncHandler( async(req, res, next) => {
    const answerId = parseInt( req.params.id, 10)
    const answer = await Answer.findByPk(answerId)

    checkPermissions(answer, req.user)

    await answer.destroy();

    return res.json(answer)
  })
)

module.exports = router;
