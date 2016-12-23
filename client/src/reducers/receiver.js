function receive(state, action, reducers) {
  const { users, currentUser } = action;
  switch (action.type) {
    case 'RECEIVE':
      const initialState = reducers(undefined, {type: "Initialize"});
      const reducedState = action.actionHistory.reduce((state, instanceAction) => {
          instanceAction.currentUser = currentUser;
          instanceAction.actingUser = users.byId[instanceAction.userId];
          return reducers(state, instanceAction);
        }, initialState);
      return Object.assign({}, state, reducedState);
    default:
      return state;
  }
}

export default receive