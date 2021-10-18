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

export const getAnswers = id => async dispatch => {
  
  const response = await csrfFetch(`/api/question/${id}/answers`)
  console.log(response, 'res')
  if(response.ok) {
    const list = await response.json();
    dispatch(load_answer(list))
  }
}

export const editAnswers = (data) => async dispatch => {
  
  const response = await csrfFetch(`/api/answers/${data.id}`, {
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

export const createAnswers = (payload) => async dispatch => {
  
  const response = await csrfFetch(`/api/question/${payload.questionId}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  
  if(response.ok) {
    const answer = await response.json();
    dispatch(add_answer(answer))
    return answer
  }
}

export const deleteAnswers = (id) => async dispatch => {
  
  const response = await csrfFetch(`/api/answers/${id}`, {
    method:'DELETE'
  })
  
  if(response.ok) {
    const data = await response.json();
    dispatch(delete_answer(data))
  }
}

const initialState = {}

const answerReducer = (state = initialState, action) => {
  let newState;
  let newAnswer;
  switch(action.type) {
    case LOAD_ANSWER: {
      newState = Object.assign({}, state);
      action.payload.forEach((answer) => {
        newState[answer.id] = answer;
      })
      return newState
    }
    case ADD_ANSWER: {
      newState = Object.assign({}, state)
      newAnswer = action.payload;
      newState[newAnswer.id] = newAnswer;
      console.log(newState, 'done')
      return newState
    }
    case EDIT_ANSWER: {
      newState = Object.assign({}, state);
      newAnswer = action.payload;
      newState[newAnswer.id] = newAnswer;
      return newState;
    }
    case DELETE_ANSWER: {
      newState = {...state};
      delete newState[action.payload];
      return newState
    }
    default: {
      return state
    }
  }
}

export default answerReducer;
