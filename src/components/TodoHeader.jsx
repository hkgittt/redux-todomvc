import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TodoHeader extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(e) {
    if (e.key === 'Enter' && this.refs.addTodoInput.value !== '') {
      const itemText = this.refs.addTodoInput.value;
      this.refs.addTodoInput.value = '';
      this.props.addItem(itemText);
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          ref="addTodoInput"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          onKeyPress={this.handleKeyPress}
        />
      </header>
    );
  }
}

TodoHeader.propTypes = {
  addItem: PropTypes.func,
};

TodoHeader.defaultProps = {
  addItem: () => {},
};
