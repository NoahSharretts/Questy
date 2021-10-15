import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestion, deleteQuestion } from '../../store/question';
import './QuestionFeed.css'

const QuestionFeed = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const questions =  useSelector(state => state.question);
  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  
  console.log(questions, 'question')
  
  return (
    <div className='questionContainer'>
      {Object.keys(questions).map(key =>
      <div className='questionDetails'>
      <h5>{questions[key].User.username}</h5>  
      <Link to={`/question/${questions[key].id}`}>
        <div>{questions[key].body}</div>
      </Link>
      </div>
      )}
    </div>
  );
};

export default QuestionFeed
