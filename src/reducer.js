import { Map } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleComplete(state, itemId) {
  const itemIndex = state.get('todos').findIndex(
    (item) => (item.get('id') === itemId)
  );

  return state.updateIn(
    ['todos', itemIndex, 'status'],
    status => (status === 'active' ? 'completed' : 'active')
  );
}

function changeFilter(state, filter) {
  return state.set('filter', filter);
}

function editItem(state, itemId) {
  const itemIndex = state.get('todos').findIndex(
    (item) => (item.get('id') === itemId)
  );

  return state.setIn(
    ['todos', itemIndex, 'editing'], true
  );
}

function cancelEditing(state, itemId) {
  const itemIndex = state.get('todos').findIndex(
    (item) => (item.get('id') === itemId)
  );

  return state.setIn(
    ['todos', itemIndex, 'editing'], false
  );
}

function doneEditing(state, itemId, newText) {
  const itemIndex = state.get('todos').findIndex(
    (item) => (item.get('id') === itemId)
  );

  return state.setIn(
    ['todos', itemIndex, 'text'], newText
  ).setIn(
    ['todos', itemIndex, 'editing'], false
  );
}

function clearCompleted(state) {
  return state.set('todos', state.get('todos').filter(todo => (todo.get('status') === 'active')));
}

function addItem(state, newText) {
  const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1;
  const newItem = Map({ id: itemId, text: newText, status: 'active', editing: false });
  return state.update('todos', todos => todos.push(newItem));
}

function deleteItem(state, itemId) {
  const itemIndex = state.get('todos').findIndex(
    (item) => (item.get('id') === itemId)
  );

  return state.deleteIn(['todos', itemIndex]);
}

export default function (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_COMPLETE':
      return toggleComplete(state, action.itemId);
    case 'CHANGE_FILTER':
      return changeFilter(state, action.filter);
    case 'EDIT_ITEM':
      return editItem(state, action.itemId);
    case 'CANCEL_EDITING':
      return cancelEditing(state, action.itemId);
    case 'DONE_EDITING':
      return doneEditing(state, action.itemId, action.newText);
    case 'CLEAR_COMPLETED':
      return clearCompleted(state);
    case 'ADD_ITEM':
      return addItem(state, action.newText);
    case 'DELETE_ITEM':
      return deleteItem(state, action.itemId);
    default:
  }
  return state;
}
