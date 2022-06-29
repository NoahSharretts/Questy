import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getAnswers, deleteAnswers } from '../../store/answer'
import AnswerModal from '../CreateAnswerForm';
import EditAnswerModal from '../EditAnswerForm';
import './AnswersFeed.css'

function AnswersFeed({ question }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  
  console.log(question, 'llllllllllllllllllllllllllllllllllll')

  useEffect(() => {
    
  }, [dispatch, questionId]);

  const handleAnswerDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let answerId = e.target.value;
    dispatch(deleteAnswers(answerId))
    history.push(`/question/${questionId}`)
  }

  return (
    <div>
      <div className='answer-header'>
        <h2>Answers</h2>
        <AnswerModal />
      </div>  
      <div className='answersContainer'>
      {question.Answers.forEach( answer =>
      <div className='answerDetails'>
        <h5>{answer.User ? answer.username : null}</h5>  
        <div
          key={answer.id}
          className='answer'>{answer.body}</div>
        <h6>{answer.createdAt}</h6>
        {(sessionUser.id === answer.userId)? 
        <div>
          <EditAnswerModal answerId={answer.id}/>  
          <button value={answer.id}  onClick={handleAnswerDelete}>Delete</button>
        </div> : null}
      </div>
      )}
    </div>
    </div>  
  )
}

export default AnswersFeed;
