import React, { PropTypes, Component } from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoTools from './TodoTools';
import Footer from './Footer';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

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
          <TodoHeader
            addItem={this.props.addItem}
          />
          <TodoList
            {...this.props}
          />
        </section>
        <TodoTools
          filter={this.props.filter}
          nbActiveItems={this.getNbActiveItems()}
          changeFilter={this.props.changeFilter}
          clearCompleted={this.props.clearCompleted}
        />
        <Footer />
      </div>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.object,
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
  addItem: PropTypes.func,
};

TodoApp.defaultProps = {
  todos: [],
  filter: 'all',
};

function mapStateToProps(state) {
  return {
    todos: state.get('todos'),
    filter: state.get('filter'),
  };
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
