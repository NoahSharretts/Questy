import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getQuestion } from '../../store/question';
import './questionFeed.css'

const questionFeed = () => {
  const dispatch = useDispatch();
  // const question =  useSelector(state => {
  //   return state.question.list.map()
  // })
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  if(!question) {
    return null;
  }

  return (
    
  )
}
