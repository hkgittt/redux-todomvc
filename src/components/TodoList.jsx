import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
  }
  getFilteredItems() {
    return this.props.todos.filter((item) =>
      this.props.filter === 'all' ||
      item.get('status') === this.props.filter);
  }
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.getFilteredItems().map(item => (
            <TodoItem
              key={item.get('id')}
              id={item.get('id')}
              text={item.get('text')}
              isCompleted={item.get('status') === 'completed'}
              isEditing={item.get('editing')}
              toggleComplete={this.props.toggleComplete}
              editItem={this.props.editItem}
              cancelEditing={this.props.cancelEditing}
              doneEditing={this.props.doneEditing}
              deleteItem={this.props.deleteItem}
            />
          ))}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.object,
  filter: PropTypes.string,
  toggleComplete: PropTypes.func,
  editItem: PropTypes.func,
  cancelEditing: PropTypes.func,
  doneEditing: PropTypes.func,
  deleteItem: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  filter: '',
};
