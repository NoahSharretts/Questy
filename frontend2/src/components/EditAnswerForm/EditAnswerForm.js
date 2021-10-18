import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editAnswers } from '../../store/answer'


function EditAnswerForm({ props }) {
  const { questionId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [body, setBody] = useState('')
  const answer = useSelector(state => state.answer[props.answerId])
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload ={
      id: props.answerId,
      body,
      questionId
    }

    const answer = await dispatch(editAnswers(payload))
    if(answer) {
      props.setShowForm(false);
      history.push(`/question/${questionId}`)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    props.setShowForm(false);
  }

  return (
    <div>
      <h2>Edit your Answer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='body'></label>
        <input 
          id='body' 
          type='text' 
          value={body} 
          placeholder={answer.body}
          onChange={(e) => setBody(e.target.value)} >
        </input>
        <div>
          <button type='button' onClick={handleCancel}>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>  
  )
}

export default EditAnswerForm;
