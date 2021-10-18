import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { createAnswers } from '../../store/answer'


function CreateAnswer({ setShowForm }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const [body, setBody] = useState('')
  const { questionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefualt();

    const payload ={
      userId: sessionUser.id,
      body,
      questionId
    }

    const answer = await dispatch(createAnswers(payload))
    if(answer) {
      setShowForm(false);
      history.push(`/question/${questionId}`)
    }
  }

  const handleCancel = (e) => {
    e.preventDefualt()
    setShowForm(false);
  }

  return (
    <div>
      <h2>Submit your answer</h2>
      <form onSubmit={handleSubmit}>
        <div className='answer-form'>
        <label htmlFor='body'>Your answer here</label>
            <textarea 
            id='body' 
            type='text' 
            onChange={(e) => setBody(e.target.value)} 
            value={body} />
            <button onClick={handleCancel} type='button'>Cancel</button>
            <button type="submit">Done</button>
        </div>
      </form>
    </div>
  )
}

export default CreateAnswer;
