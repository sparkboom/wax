import React from 'react';
import {connect} from 'react-redux';

import {InputContainer, CommandInput} from './private';

import * as actions from './actions';

const CHARCODE_RETURN = 13;

class CommandLine extends React.Component {

  onKeyPress = e => {
    if (e.charCode === CHARCODE_RETURN){
      this.props.inputSet(e);
    }
  };

  render() {
    let {inputChange, currentInput} = this.props;
    return (
    <div>
      ({currentInput})
      <InputContainer>
        <CommandInput
          autoFocus
          onChange={inputChange}
          onKeyPress={this.onKeyPress} />
      </InputContainer>
    </div>);
  }
}

export default connect(props => ({
  currentInput: props.command.currentInput
}), dispatch => ({
  inputChange: event => dispatch(actions.inputChange(event.target.value)),
  inputSet: event => dispatch(actions.inputSet(event.target.value)),
}))(CommandLine);
