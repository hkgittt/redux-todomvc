import { List, Map } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active' }),
          Map({ id: 2, text: 'Redux', status: 'active' }),
          Map({ id: 3, text: 'Immutable', status: 'completed' })
        ),
      }),
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active' }),
          Map({ id: 2, text: 'Redux', status: 'active' }),
          Map({ id: 3, text: 'Immutable', status: 'completed' })
        ),
      })
    );
  });

  it('handles SET_STATE with vanilla states', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        todos: [
          { id: 1, text: 'React', status: 'active' },
          { id: 2, text: 'Redux', status: 'active' },
          { id: 3, text: 'Immutable', status: 'completed' },
        ],
      },
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active' }),
          Map({ id: 2, text: 'Redux', status: 'active' }),
          Map({ id: 3, text: 'Immutable', status: 'completed' })
        ),
      })
    );
  });

  it('handles SET_STATE with no initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        todos: [
          { id: 1, text: 'React', status: 'active' },
          { id: 2, text: 'Redux', status: 'active' },
          { id: 3, text: 'Immutable', status: 'completed' },
        ],
      },
    };

    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active' }),
          Map({ id: 2, text: 'Redux', status: 'active' }),
          Map({ id: 3, text: 'Immutable', status: 'completed' })
        ),
      })
    );
  });

  it('handles TOGGLE_COMPLETE by changing the status from active to complete', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active' }),
        Map({ id: 2, text: 'Redux', status: 'active' }),
        Map({ id: 3, text: 'Immutable', status: 'completed' })
      ),
    });
    const action = {
      type: 'TOGGLE_COMPLETE',
      itemId: 1,
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'completed' }),
          Map({ id: 2, text: 'Redux', status: 'active' }),
          Map({ id: 3, text: 'Immutable', status: 'completed' })
        ),
      })
    );
  });

  it('handles CHANGE_FILTER by changing filter state', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active' }),
        Map({ id: 2, text: 'Redux', status: 'active' }),
        Map({ id: 3, text: 'Immutable', status: 'completed' })
      ),
      filter: 'all',
    });
    const action = {
      type: 'CHANGE_FILTER',
      filter: 'completed',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active' }),
          Map({ id: 2, text: 'Redux', status: 'active' }),
          Map({ id: 3, text: 'Immutable', status: 'completed' })
        ),
        filter: 'completed',
      })
    );
  });

  it('handles EDIT_ITEM by setting editing to true', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active', editing: false })
      ),
    });
    const action = {
      type: 'EDIT_ITEM',
      itemId: 1,
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active', editing: true })
        ),
      })
    );
  });

  it('handles CANCEL_EDITING by setting editing to false and reverting back to original text',
  () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active', editing: true })
      ),
    });
    const action = {
      type: 'CANCEL_EDITING',
      itemId: 1,
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active', editing: false })
        ),
      })
    );
  });

  it('handles DONE_EDITING by setting editing to false and saving new label text', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active', editing: true })
      ),
    });
    const action = {
      type: 'DONE_EDITING',
      itemId: 1,
      newText: 'React Master',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React Master', status: 'active', editing: false })
        ),
      })
    );
  });

  it('handles CLEAR_COMPLETED by clearing completed items', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active', editing: false }),
        Map({ id: 2, text: 'Redux', status: 'completed', editing: false })
      ),
    });
    const action = {
      type: 'CLEAR_COMPLETED',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active', editing: false })
        ),
      })
    );
  });

  it('handles ADD_ITEM by adding the item', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active', editing: false })
      ),
    });
    const action = {
      type: 'ADD_ITEM',
      newText: 'React Rules!',
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(
          Map({ id: 1, text: 'React', status: 'active', editing: false }),
          Map({ id: 2, text: 'React Rules!', status: 'active', editing: false })
        ),
      })
    );
  });

  it('handles DELETE_ITEM by deleting the item', () => {
    const initialState = Map({
      todos: List.of(
        Map({ id: 1, text: 'React', status: 'active', editing: false })
      ),
    });
    const action = {
      type: 'DELETE_ITEM',
      itemId: 1,
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(
      Map({
        todos: List.of(),
      })
    );
  });
});
