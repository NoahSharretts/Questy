import { csrfFetch } from './csrf';

const LOAD_QUESTION = 'LOAD_QUESTION';
const LOAD_ONE = 'LOAD_ONE';
const ADD_QUESTION = 'ADD_QUESTION';
const EDIT_QUESTION = 'EDIT_QUESTION';
const DELETE_QUESTION = 'DELETE_QUESTION';

const load_question = list => ({
  type: LOAD_QUESTION,
  payload: list,
})

const load_one = oneQuestion => ({
  type: LOAD_ONE,
  payload: oneQuestion
})

const add_question = question => ({
  type: ADD_QUESTION,
  payload: question,
})

const edit_question = editQuestion => ({
  type: EDIT_QUESTION,
  payload: editQuestion
})

const delete_question = deleteQuestion => ({
  type: DELETE_QUESTION,
  payload: deleteQuestion
})

export const getQuestion = () => async dispatch => {
  
  const response = await csrfFetch(`/api/question`)
  
  if(response.ok) {
    const list = await response.json();
    dispatch(load_question(list))
  }
}

export const getOneQuestion = id => async dispatch => {

  const response = await csrfFetch(`/api/question/${id}`)

  if(response.ok) {
    const oneQuestion = await response.json();
    dispatch(load_one(oneQuestion))
  }
}

// export const getQuestionTopics = () => async dispatch => {

//   const response = await csrfFetch(`/api/question/topics`);

//   if (response.ok) {
//     const topics = await response.json();
//     dispatch(load_topics(topics));
//   }
// };

export const createQuestion = data => async dispatch => {
  const response = await csrfFetch(`/api/question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (response.ok) {
    const question = await response.json();
    dispatch(add_question(question));

    return question;
  }
};

export const editQuestion = payload => async dispatch => {
  const response = await csrfFetch(`/api/question/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const question = await response.json();
    dispatch(edit_question(question));
    return question;
  }
};

export const deleteQuestion = id => async dispatch => {
  const response = await csrfFetch(`/api/question/${id}`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    const question = await response.json();
    dispatch(delete_question(question));
    return question;
  }
};

const initialState = {};

const questionReducer = (state = initialState, action) => {
  let newState = {};
  let newQuestion = {};
  switch (action.type) {
    case LOAD_QUESTION: {
      console.log('whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
      newState = Object.assign({}, state);
      action.payload.forEach((question) => {
        newState[question.id] = question;
      })
      return newState
    }
    // case LOAD_TOPICS: {
    //   return {
    //     ...state,
    //     topic: action.topic
    //   }
    // }
    case EDIT_QUESTION: {
      newState = Object.assign({}, state);
      newQuestion = action.payload;
      newState[newQuestion.id] = newQuestion;
      return newState;
    }
    case DELETE_QUESTION: {
      newState = {...state};
      delete newState[action.payload];
      return newState
    }
    case LOAD_ONE: {
      console.log('herhehrehrhehrehrher')
      newState = Object.assign({}, state); 
      newState = Object.assign({}, action.payload);
      console.log(newState, '**************************************************************')
      return newState
    }
    default :
      return state;
  }
}

export default questionReducer;
