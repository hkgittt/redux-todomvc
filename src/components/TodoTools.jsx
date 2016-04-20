import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

export default class TodoTools extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.setSelectedClass = this.setSelectedClass.bind(this);
  }
  setSelectedClass(filter) {
    return classNames({ selected: this.props.filter === filter });
  }
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.nbActiveItems}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#"
              className={this.setSelectedClass('all')}
              onClick={() => this.props.changeFilter('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#"
              className={this.setSelectedClass('active')}
              onClick={() => this.props.changeFilter('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#"
              className={this.setSelectedClass('completed')}
              onClick={() => this.props.changeFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={this.props.clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

TodoTools.propTypes = {
  nbActiveItems: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};

TodoTools.defaultProps = {
  changeFilter: () => {},
};
