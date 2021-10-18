import { Modal } from '../../context/Modal'
import { useState } from 'react'
import CreateAnswer from './CreateAnswer'
import './CreateAnswerForm.css'

function AnswerModal() {
  const [showForm, setShowForm] = useState(false)
  

  return (
    <div>
      <button 
        id='add-awnser' 
        onClick={() => setShowForm(true)} >Add Answer
      </button>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateAnswer setShowForm={setShowForm} />
        </Modal>
      )}
    </div>
  )
}

export default AnswerModal;
