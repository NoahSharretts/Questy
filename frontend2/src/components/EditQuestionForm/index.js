import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editQuestion } from "../../store/question";
import './EditQuestionForm.css'

function EditQuestionForm() {
  const { questionId } = useParams();
  const history = useHistory();
  const question = useSelector(state => state.question)
  const dispatch = useDispatch();
  const [body, setBody] = useState('')
  const [topic, setTopic] = useState(1)


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: questionId,
      body,
      topic,
    }

    const edit = await dispatch(editQuestion(payload))

    history.push(`/question/${questionId}`)
    if (edit) {
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/feed`)
  }

  return (
    <div className='edit-form'>
      <h2>Edit your Question</h2>
      <form  onSubmit={handleSubmit}>
        <input 
          id='body' 
          type='text' 
          value={body} 
          placeholder={question.body}
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

export default EditQuestionForm;
