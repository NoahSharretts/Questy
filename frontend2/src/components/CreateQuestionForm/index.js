import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getQuestionTopics, createQuestion } from '../../store/question'
import './CreateQuestionForm.css'

const CreateQuestionForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id)
  const history = useHistory();
  // const questionTopics = useSelector(state => state.question.topic)
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState(1)
  const [errors, setErrors] = useState([]);
  
  // console.log(questionTopics, 'Topics')
  
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
  // useEffect(() => {
  //   console.log('5')
  //   dispatch(getQuestionTopics());
  //   console.log('6')

  // }, [dispatch]);

  // useEffect(() => {
  //   console.log('6')

  //   if (questionTopics.length && !topic) {
  //     setTopic(questionTopics[0]);
  //   }
  // }, [questionTopics, topic]);

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
            {/* <select  
              id='topic-selector'
              onChange={(e) => setTopic(e.target.value)}
              value={topic}>
              {questionTopics.map(topic =>
                <option key={topic}>{topic}</option>
              )}
            </select> */}
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
