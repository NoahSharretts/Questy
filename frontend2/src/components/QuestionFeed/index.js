import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getQuestion, deleteQuestion } from '../../store/question';
import './QuestionFeed.css'

const QuestionFeed = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const questions =  useSelector(state => state.question);
  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  const handleEditClick = (e) => {
    e.preventDefault();
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(deleteQuestion(e.target.value))
    history.push('/feed')
  }

  // console.log(sessionUser, 'question')
  
  console.log(questions, 'question')
  
  return (
    <div className='questionContainer'>
      {Object.keys(questions).map(key =>
      <div 
        key={questions[key].id} 
        className='questionDetails'
      >
      <h5>{questions[key].User.username}</h5>  
      <Link 
        key={questions[key].id} 
        to={`/question/${questions[key].id}`}
      >
        <div>{questions[key].body}</div>
      </Link>
        <div>
          <button value={questions[key].id}onClick={handleEditClick}>Edit</button>
          <button value={questions[key].id}onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default QuestionFeed
