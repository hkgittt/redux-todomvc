import React, { PropTypes, Component } from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoTools from './TodoTools';
import Footer from './Footer';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.getNbActiveItems = this.getNbActiveItems.bind(this);
  }
  getNbActiveItems() {
    if (this.props.todos) {
      const activeItems = this.props.todos.filter(
        item => (item.get('status') === 'active')
      );
      return activeItems.size;
    }
    return 0;
  }
  render() {
    return (
      <div>
        <section className="todoapp">
          <TodoHeader />
          <TodoList
            {...this.props}
          />
        </section>
        <TodoTools
          filter={this.props.filter}
          nbActiveItems={this.getNbActiveItems()}
        />
        <Footer />
      </div>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.object,
  filter: PropTypes.string,
};

TodoApp.defaultProps = {
  todos: [],
  filter: 'all',
};

export default TodoApp;
