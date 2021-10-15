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


  return (
    <h2>Questions!</h2>
  );
};

export default QuestionFeed
