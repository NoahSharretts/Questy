import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createQuestion, getTopics } from '../../store/question'
import './CreateQuestionForm.css'

const CreateQuestionForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory();

  const [body, setBody] = useState('');
  const [topic, setTopic]

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    history.push('/')
  }

  useEffect(() => {
    const ERRORS = [];
  
    if (!body) ERRORS.push("CANNOT submit an empty question");
  
    if (body.length < 3) ERRORS.push("Questions must be 3 characters or more");

    setErrors(ERRORS)
  }, [fruits, name, sweetness])

  return (
    <div className='question-form-container'>
        <h2>Got a Question?</h2>
        <form onSubmit={handleSubmit} className='question-form'>
          <div>
            <label>
              What would you like to ask?
              <input 
              id='body' 
              type='text' 
              onChange={(e) => setBody(e.target.value)} 
              value={body} />
            </label>
          </div>
          <div>

          </div>
        </form>  
    </div>
  )
}
