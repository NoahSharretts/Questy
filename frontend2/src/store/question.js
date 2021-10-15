import { csrfFetch } from './csrf';

const LOAD_QUESTION = 'LOAD_QUESTION';
const LOAD_TOPICS = 'LOAD_TOPICS';
const ADD_QUESTION = 'ADD_QUESTION';
const EDIT_QUESTION = 'EDIT_QUESTION';
const DELETE_QUESTION = 'DELETE_QUESTION';

const load_question = list => ({
  type: LOAD_QUESTION,
  payload: list,
})

const load_topics = topic => ({
  type: LOAD_TOPICS,
  payload: topic
})

const add_question = question => ({
  type: ADD_QUESTION,
  payload: question
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
  console.log(response)
  

  if(response.ok) {
   
    const list = await response.json();
    dispatch(load_question(list))
  }
}

export const getOneQuestion = id => async dispatch => {

  const response = await csrfFetch(`/api/question${id}`)

  if(response.ok) {
    const question = await response.json();
    dispatch(load_question(question))
  }
}

export const getQuestionTopics = () => async dispatch => {
  const response = await csrfFetch(`/api/question/topics`);

  if (response.ok) {
    const topics = await response.json();
    dispatch(load_topics(topics));
  }
};

export const createQuestion = data => async dispatch => {
  console.log(data);
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

export const editQuestion = data => async dispatch => {
  const response = await csrfFetch(`/api/question/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (response.ok) {
    const question = await response.json();
    dispatch(edit_question(question));
    return question;
  }
};

export const deleteQuestion = data => async dispatch => {
  const response = await csrfFetch(`/api/question/${data.id}`, {
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
  let newState = {...state};
  switch (action.type) {
    case LOAD_QUESTION: {
      newState = Object.assign({}, state);
      action.payload.forEach((question) => {
        newState[question.id] = question;
      })
      return newState
    }
    case LOAD_TOPICS: {
      return {
        ...state,
        topic: action.topic
      }
    }
    // case ADD_QUESTION: {
    //   if (!state[action.question.id]) {
    //     const newState = {
    //       ...state,
    //       [action.question.id]: action.question
    //     };
    //     const questionList = newState.list.map(id => newState[id]);
    //     questionList.push(action.question);
    //     newState.list = questionList;
    //     return newState;
    //   }
    //   // return {
    //   //   ...state,
    //   //   []
    //   // }
    // }
    // case EDIT_QUESTION: {

    // }
    // case DELETE_QUESTION: {

    // }
    default :
      return state;

  }
}

export default questionReducer;
