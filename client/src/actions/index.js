import fetch from 'isomorphic-fetch'

export const addCard = (content) => ({
  type: 'SERVER/ADD_CARD',
  content
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleCard = (id) => {
  return {
    type: 'SERVER/TOGGLE_CARD',
    id
  };
}

export const startDrag = () => ({
  type: 'START_DRAG'
});

export const moveCard = (draggedId, overId) => ({
  type: 'SERVER/MOVE_CARD',
  draggedId,
  overId
});

export const endDrag = () => ({
  type: 'END_DRAG'
});

export const receiveTodos = actionHistory => ({
  type: 'RECEIVE',
  actionHistory: actionHistory
});

export const fetchTodos = () => dispatch => {
  return fetch('http://localhost:8080/api/todos')
  .then(response => response.json())
  .then(json => dispatch(receiveTodos(json)));
  // TODO: add error handling catch
}

export const receiveUser = user => ({
  type: 'RECEIVE_USER',
  user: user
});

export const identify = () => dispatch => {
  return fetch('/api/users/identify', {credentials: 'include'})
    .then(response => response.json())
    .then(json => dispatch(receiveUser(json)));
}

export const login = username => dispatch => {
  return fetch('/api/users/login', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: `username=${username}`
    })
  .then(response => response.json())
  .then(json => dispatch(receiveUser(json)));

}

export const logout = () => dispatch => {
  return fetch ('/api/users/logout', {
    credentials: 'include',
    method: 'POST'
  })
  .then (response => response.json())
  .then(json => dispatch(receiveUser(json)));

}