import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getAnswers, deleteAnswers } from '../../store/answer'
import AnswerModal from '../CreateAnswerForm';
import EditAnswerModal from '../EditAnswerForm';
import './AnswersFeed.css'

function AnswersFeed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  

  const answers = useSelector(state => state.answer)

  useEffect(() => {
    dispatch(getAnswers(questionId));
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
      {Object.keys(answers).map(key =>
      <div className='answerDetails'>
        <h5>{answers[key].User ? answers[key].username : null}</h5>  
        <div
          key={answers[key].id}
          className='answer'>{answers[key].body}</div>
        <h6>{answers[key].createdAt}</h6>
        {(sessionUser.id === answers[key].userId)? 
        <div>
          <EditAnswerModal answerId={answers[key].id}/>  
          <button value={answers[key].id}  onClick={handleAnswerDelete}>Delete</button>
        </div> : null}
      </div>
      )}
    </div>
    </div>  
  )
}

export default AnswersFeed;
