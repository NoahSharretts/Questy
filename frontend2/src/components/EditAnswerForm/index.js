import { Modal } from '../../context/Modal'
import { useState } from 'react'
import EditAnswerForm from './EditAnswerForm'
import './EditAnswerForm.css'

function EditAnswerModal() {
  const [showForm, setShowForm] = useState(false)


  return (
    <div>
      <button 
        id='edit-awnser' 
        onClick={() => setShowForm(true)} >edit Answer
      </button>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <EditAnswerForm setShowForm={setShowForm} />
        </Modal>
      )}
    </div>
  )
}
