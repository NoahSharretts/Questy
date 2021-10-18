import { csrfFetch } from "./csrf";

const LOAD_ANSWER = 'LOAD_ANSWER';
const ADD_ANSWER = 'ADD_ANSWER';
const EDIT_ANSWER = 'EDIT_ANSWER';
const DELETE_ANSWER = 'DELETE_ANSWER';

const load_answer = list => ({
  type: LOAD_ANSWER,
  payload: list,
})

const add_answer = answer => ({
  type: ADD_ANSWER,
  payload: answer,
})

const edit_answer = editAnswer=> ({
  type: EDIT_ANSWER,
  payload: editAnswer
})

const delete_answer = deleteAnswer => ({
  type: DELETE_ANSWER,
  payload: deleteAnswer
})

export const getAnswers = (id) => async dispatch => {
  
  const response = await csrfFetch(`/api/question/${id}/answers`)
  
  if(response.ok) {
    const list = await response.json();
    dispatch(load_answer(list))
  }
}

export const editAnswers = (data) => async dispatch => {
  
  const response = await csrfFetch(`/api/question/${id}/answers`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
  if(response.ok) {
    const answer = await response.json();
    dispatch(edit_answer(answer))
    return answer
  }
}

export const createAnswers = (data) => async dispatch => {
  
  const response = await csrfFetch(`/api/question/${id}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
  if(response.ok) {
    const answer = await response.json();
    dispatch(add_answer(answer))
    return answer

  }
}

export const deleteAnswers = (id) => async dispatch => {
  
  const response = await csrfFetch(`/api/question/${id}/answers`, {
    method:'DELETE'
  })
  
  if(response.ok) {
    const data = await response.json();
    dispatch(delete_answer(data))
  }
}

const initialState = {}

const answerReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_ANSWER: {
      
    }
    case ADD_ANSWER: {
      
    }
    case EDIT_ANSWER: {
      
    }
    case DELETE_ANSWER: {
      
    }
  }
}
