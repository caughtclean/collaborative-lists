require("../styles/application.scss");
import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer'
import Register from './components/Register.jsx';
import reducer from './reducers'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import createLogger from 'redux-logger';
import notifications from './middleware/notifications';
import injectUser from './middleware/injectUser';
import ReduxThunk from 'redux-thunk';

function pessimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
}

const loggerMiddleware = createLogger();
const host = location.host.split(':')[0];
const socketAddress = 'http://'+host+':8080';
console.log('host:', host);
const socket = io(socketAddress);
const socketIoMiddleware = createSocketIoMiddleware(
  socket,
  ['SERVER/ADD_CARD', 'SERVER/TOGGLE_CARD', 'SERVER/MOVE_CARD', 'SERVER/VOTE_CARD', 'SERVER/CHAT_MESSAGE'],
  pessimisticExecute
);
const store = applyMiddleware(ReduxThunk, notifications, injectUser, socketIoMiddleware, loggerMiddleware)(createStore)(reducer);

render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('react-root')
)
