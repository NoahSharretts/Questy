import { Modal } from '../../context/Modal'
import { useState } from 'react'
import EditAnswerForm from './EditAnswerForm'
import './EditAnswerForm.css'

function EditAnswerModal({ answerId }) {
  const [showForm, setShowForm] = useState(false)
  let props = { setShowForm, answerId }
  return (
    <div>
      <button 
        id='edit-awnser' 
        onClick={(e) => setShowForm(true)} >edit Answer
      </button>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <EditAnswerForm props={props} />
        </Modal>
      )}
    </div>
  )
}

export default EditAnswerModal;
