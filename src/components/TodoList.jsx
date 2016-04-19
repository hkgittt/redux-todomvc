import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(item => (
            <TodoItem
              key={item.get('id')}
              text={item.get('text')}
            />
          ))}
        </ul>
      </section>
    );
  }
}

// const TodoList = (props) => (
//       <section className="main">
//         <ul className="todo-list">
//           {props.todos.map(item => (
//             <TodoItem
//               key={item.get('id')}
//               text={item.get('text')}
//             />
//           ))}
//         </ul>
//       </section>
// );

TodoList.propTypes = {
  todos: PropTypes.object,
};

TodoList.defaultProps = {
  todos: [],
};

// export default TodoList;
