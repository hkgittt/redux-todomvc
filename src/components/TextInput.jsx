import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.text };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  cancelEditing() {
    this.setState({
      value: this.props.text,
    });
    this.props.cancelEditing(this.props.itemId);
  }
  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        this.props.doneEditing(this.props.itemId, e.target.value);
        break;
      case 'Escape':
        this.cancelEditing();
        break;
      default:
    }
  }
  handleOnBlur() {
    this.cancelEditing();
  }
  handleOnChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    return (
      <input
        type="text"
        className="edit"
        autoFocus
        value={this.state.value}
        onChange={this.handleOnChange}
        ref="itemInput"
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleOnBlur}
      />
    );
  }
}

TextInput.propTypes = {
  text: PropTypes.string,
  itemId: PropTypes.number,
  cancelEditing: PropTypes.func,
  doneEditing: PropTypes.func,
};

TextInput.defaultProps = {
  text: '',
  cancelEditing: () => {},
};
