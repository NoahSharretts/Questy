import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {  deleteQuestion } from '../../store/question'


function AnswersFeed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const answers = useSelector(state => state.answers)

  console.log(answers)
  return (
    <h2>testi9ign</h2>
  )
}

export default AnswersFeed;
