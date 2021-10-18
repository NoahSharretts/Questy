import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getQuestion, deleteQuestion, editQuestion} from '../../store/question';
import './QuestionFeed.css'

const QuestionFeed = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const questions =  useSelector(state => state.question);
  // const [showForm, setShowForm] = useState(false);
  console.log(questions, 'questions')
  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  return (
    <div className='questionContainer'>
      {Object.keys(questions).map(key =>
      <div 
        key={questions[key].id}
        className='questionDetails'
      >
      <h5></h5>  
      <Link 
        key={questions[key].id} 
        to={`/question/${questions[key].id}`}
      >
        <div className='question'>{questions[key].body}</div>
      </Link>
      </div>
      )}
    </div>
  );
};

export default QuestionFeed
