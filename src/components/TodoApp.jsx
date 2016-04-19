import React, { PropTypes } from 'react';
import TodoList from './TodoList';

const TodoApp = (props) => (
  <div>
    <section className="todoapp">
      <TodoList todos={props.todos} />
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
