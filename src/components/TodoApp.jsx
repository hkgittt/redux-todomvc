import React, { PropTypes } from 'react';

const TodoApp = (props) => (
  <div>
    <section className="todoapp">
      <section className="main">
        <ul className="todo-list">
          {props.todos.map(item => (
            <li
              className="active"
              key={item.get('id')}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                />
                <label htmlFor="todo">
                  {item.get('text')}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  </div>
);


TodoApp.propTypes = {
  todos: PropTypes.object,
};

TodoApp.defaultProps = {
  todos: [],
};

export default TodoApp;
