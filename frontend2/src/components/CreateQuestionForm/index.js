import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createQuestion } from '../../store/question'
import './CreateQuestionForm.css'

const CreateQuestionForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id)
  const history = useHistory();
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState(1)
  const [errors, setErrors] = useState([]);
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTopic(1)
    const payload = {
      userId,
      body,
      topic,
    }
    const question = await dispatch(createQuestion(payload))
    if (question) {
      history.push('/feed')

    }
  }

  useEffect(() => {
    const ERRORS = [];
    
    if (!body) ERRORS.push("CANNOT submit an empty question");
    
    if (body.length < 3) ERRORS.push("Questions must be 3 characters or more");
    
    setErrors(ERRORS)
  }, [body])
  
  return (
    <div className='question-form-container'>
        <h2>Got a Question?</h2>
        <ul className="errors">
        {errors.map((err) => (
          <li key={err}>{err}</li>
        ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className='question-form'>
            <label htmlFor='body'>What would you like to ask?</label>
            <textarea 
            id='body' 
            type='text' 
            onChange={(e) => setBody(e.target.value)} 
            value={body} />
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
