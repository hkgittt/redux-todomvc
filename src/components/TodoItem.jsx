import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import TextInput from './TextInput';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    console.log('@TodoItem rendering: ', this.props.text);
    return (
      <li
        className="todo"
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
          />
          <label htmlFor="todo">
            {this.props.text}
          </label>
          <button className="destory"></button>
        </div>
        <TextInput />
      </li>
    );
  }
}

TodoItem.propTypes = {
  text: PropTypes.string,
};

TodoItem.defaulProps = {
  text: '',
};
