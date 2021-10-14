import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, Route, useParams } from 'react-router-dom';
import { getQuestion } from '../../store/question';
import './QuestionFeed.css'

const QuestionFeed = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const question =  useSelector(state => {
    console.log(state, 'here')
    return state.question.map(questionId => state.question[questionId])
  })
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
      <div>
        
      </div>
    </main>
    
  );
};

export default QuestionFeed
