import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getOneQuestion, deleteQuestion } from '../../store/question'
import EditQuestionForm from '../EditQuestionForm';
import AnswersFeed from '../AnswersFeed';
import './QuestionPage.css'


function QuestionPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const question = useSelector(state => state.question[questionId - 1]);
  console.log('please')

  useEffect(() => {
    dispatch(getOneQuestion(questionId))
    console.log('please')
  }, [dispatch, questionId])
  
  
  const handleQuestionDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let questionId = e.target.value;
    dispatch(deleteQuestion(questionId))
    history.push('/feed')
  }

  console.log(question, 'kkkkkkkkkkkkkkk')

  return (
    <div className='edit-container'>
      <div id='edit-question'>{question.body}</div>
      {(sessionUser.id === question.userId)? 
          <div>
          <EditQuestionForm />  
          <button value={question.id}  onClick={handleQuestionDelete}>Delete</button>
        </div> : null}
      <AnswersFeed question={question}/>
    </div>
      
  )
}

export default QuestionPage;
