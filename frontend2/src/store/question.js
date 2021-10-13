import { csrfFetch } from './csrf';

const LOAD_QUESTION = 'LOAD_QUESTION';
const LOAD_TOPICS = 'LOAD_TOPICS';
const ADD_QUESTION = 'ADD_QUESTION';

const load_question = list => ({
  type: LOAD_QUESTION,
  list,
})

const load_topics = topics => ({
  type: LOAD_TOPICS,
  topic
})

const add_question = question => ({
  type: ADD_QUESTION,
  question
})


export const getQuestion = data => async dispatch => {

  const response = await csrfFetch(`/api/question`)

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
    method: 'post',
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

export const updateQuestion = data => async dispatch => {
  const response = await csrfFetch(`/api/question/${data.id}`, {
    method: 'put',
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

const initialState = {
  list: [],
  types: []
};
