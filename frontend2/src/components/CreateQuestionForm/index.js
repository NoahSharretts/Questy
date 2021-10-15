import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createQuestion, getQuestionTopics } from '../../store/question'
import './CreateQuestionForm.css'

const CreateQuestionForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory();
  const questionTopics = useSelector(state => state.topic)
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('')
  
  useEffect(() => {
    dispatch(getQuestionTopics());
  }, [dispatch]);

  useEffect(() => {
    const ERRORS = [];
    
    if (!body) ERRORS.push("CANNOT submit an empty question");
    
    if (body.length < 3) ERRORS.push("Questions must be 3 characters or more");
    
    setErrors(ERRORS)
  }, [body])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    history.push('/feed')
  }
  return (
    <div className='question-form-container'>
        <h2>Got a Question?</h2>
        <ul className="errors">
        {errors.map((err) => (
          <li key={err}>{err}</li>
        ))}
        </ul>
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
            <select  
              id='topic-selector'
              onChange={(e) => setTopic(e.target.value)}
              value={topic}>
              {questionTopics.map(topic =>
                <option key={topic}>{topic}</option>
              )}
            </select>
            <button
              disabled={errors.length ? true : false }
              type="submit"
            >
              Done
            </button>
          </div>
          <div>

          </div>
        </form>  
    </div>
  )
}

export default CreateQuestionForm;
