import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getQuestion, deleteQuestion, editQuestion} from '../../store/question';
import './QuestionFeed.css'

const QuestionFeed = () => {
  const dispatch = useDispatch();
  // const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const questions =  useSelector(state => Object.values(state.question));

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);


  return (
    <div className='questionContainer'>
      {questions.map((question) => (
        <div className='question' key={question.id}>
          <h5>{question.User ? question.User.username : null}</h5>
          <Link to={`/question/${question.id}`}>{question.body}</Link>
          <h6>{question.createdAt}</h6>
        </div>
      ))}
    </div>
  )
};

export default QuestionFeed
