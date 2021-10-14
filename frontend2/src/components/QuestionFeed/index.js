import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestion } from '../../store/question';
import './QuestionFeed.css'

const QuestionFeed = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const question =  useSelector(state => state.question);
  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  // if(!question) {
  //   return null;
  // };

  return (
    <main>
    <h2>Qustions!</h2>
      <ul>{Object.keys(question).map(key =>
        <li key={question[key].id}>
        <Link to={`/question/${question[key].id}`}>
          <div>{question[key].title}</div>
        </Link>
        </li>)}
      </ul>
    </main>
    
  );
};

export default QuestionFeed
