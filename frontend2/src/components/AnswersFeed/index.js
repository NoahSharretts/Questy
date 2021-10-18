import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getAnswers } from '../../store/answer'
import './AnswersFeed.css'

function AnswersFeed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const answers = useSelector(state => state.answer)
  console.log(answers, "answers")

  useEffect(() => {
    dispatch(getAnswers(questionId));
  }, [dispatch]);

  return (
    <div>
      <div className='answer-header'>
        <h2>Answers</h2>
        <button id='add-awnser'>Add Answer</button>
      </div>  
      <div className='answersContainer'>
      {Object.keys(answers).map(key =>
      <div className='answerDetails'>
        <h5>{answers[key].User.username}</h5>  
        <div
          key={answers[key].id}
          className='question'>{answers[key].body}</div>
        <h6>{answers[key].createdAt}</h6>
      </div>
      )}
    </div>
    </div>  
  )
}

export default AnswersFeed;
