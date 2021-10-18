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

  // Object.entries(questions).forEach((question) =>
  //   console.log(question[1].body)
  // )
  
  // const [showForm, setShowForm] = useState(false);
  // console.log(question, 'questions')
  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  const question = Object.entries(questions).map((question) =>
  <div key={question[1].id} className='questionDetails'>
      <div><h5>{question[1].User ? question[1].User.username : null}</h5> </div>
      <Link to={`/question/${question[1].id}`}>{question[1].body}</Link>
      <div><h6>{question[1].createdAt}</h6></div>
  </div>)
  return (
    <div className='questionContainer'>
      {question}
    </div>
  );
};

{/* {Object.keys(questions).map(key =>
<div key={questions[key].id} className='questionDetails'>
  <h5>{questions[key].User.username}</h5>  
  <Link to={`/question/${questions[key].id}`}>{questions[key].body}</Link>
  <h6>{questions[key].createdAt}</h6>
</div>
)} */}
export default QuestionFeed
