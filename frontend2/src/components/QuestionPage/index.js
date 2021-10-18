import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getOneQuestion, deleteQuestion } from '../../store/question'
import EditQuestionForm from '../EditQuestionForm';
import AnswersFeed from '../AnswersFeed';
import EditAnswerForm from '../EditAnswerForm';
import './QuestionPage.css'


function QuestionPage() {
  const history = useHistory();
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const question = useSelector(state => state.question);

  console.log(questionId)
  useEffect(() => {
    dispatch(getOneQuestion(questionId))
  }, [dispatch, questionId])
  
  
  const handleQuestionDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let questionId = e.target.value;
    dispatch(deleteQuestion(questionId))
    history.push('/feed')
  }



  return (
    <div className='edit-container'>
      <div id='edit-question'>{question.body}</div>
      {(sessionUser.id === question.userId)? 
          <div>
          <EditQuestionForm />  
          <button value={question.id}  onClick={handleQuestionDelete}>Delete</button>
        </div> : null}
      <h2>Answers</h2>
      {/* {answers.map( (answer) =>
        <div key={question}>
          <h3>{answer.body}</h3>
          <div key={question}>
            {(sessionUser.id === question.userId)? 
              <div key={question}>
              <EditAnswerForm {...answers}/>  
            </div> : null}
          </div>
        </div>
      )} */}
    </div>
  )
}

export default QuestionPage;
