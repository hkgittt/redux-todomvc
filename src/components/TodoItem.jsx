import React, { PropTypes } from 'react';

import TextInput from './TextInput';

const TodoItem = (props) => (
  <li
    className="todo"
  >
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
      />
      <label htmlFor="todo">
        {props.text}
      </label>
      <button className="destory"></button>
    </div>
    <TextInput />
  </li>
);

TodoItem.propTypes = {
  text: PropTypes.string,
};

TodoItem.defaulProps = {
  text: '',
};

export default TodoItem;
