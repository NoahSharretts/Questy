import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editQuestion } from "../../store/question";


function EditAnswerForm() {
  const { questionId } = useParams();
  const history = useHistory();
  const question = useSelector(state => state.question[questionId])

  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: questionId,
      body,
    }

    dispatchEvent(editQuestion(payload))
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`question/${questionId}`)
  }

  return (
    <div>
      <h2>Edit your Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='body'>Question</label>
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

export default EditAnswerForm;
