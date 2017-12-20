import React from 'react';
import {connect} from 'react-redux';
import keycode from 'keycode';
import {InputContainer, CommandInput, RichInput} from './private';
import * as actions from './actions';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

const RickInputContainer = styled(InputContainer)`
  bottom: 8rem;
`;

class CommandLine extends React.Component {

  inputRef = null;

  onKeyPress = e => {
    console.log('onKeyPress', e);
    if (keycode(e) === 'enter'){
      this.props.inputSet(e);
    }else if (!isEmpty(e.key)) {
      this.props.inputInsert(e);
    }else {
      console.log('Did not handle keypress event', keycode(e));
    }
  };

  onKeyDown = e => {
    console.log('onKeyDown', keycode(e), {left: keycode.codes.left}, e);
    if (e.target !== this.inputRef){
      return;
    }else if (keycode(e) === 'left' || keycode(e) === 'right'){
      this.props.moveCaret(keycode(e));
    }else {
      console.debug('onKeyDown event not handled', e);
    }
  };

  componentWillMount() {
    document.addEventListener("keydown", ::this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", ::this.onKeyDown);
  }

  render() {
    let {currentInput, caretIndex} = this.props;
    return (
    <div>
      <RickInputContainer>
        <RichInput
          inputRef={r => this.inputRef = r}
          value={currentInput}
          caretIndex={caretIndex}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress} />
      </RickInputContainer>
      <InputContainer>
        <CommandInput
          autoFocus
          value={currentInput}
          onChange={this.props.inputChange} />
      </InputContainer>
    </div>);
  }
}

export default connect(props => ({
  currentInput: props.command.currentInput,
  caretIndex: props.command.caretIndex,
}), dispatch => ({
  inputChange: event => dispatch(actions.inputChange(event.target.value)),
  inputSet: event => dispatch(actions.inputSet(event.target.value)),
  inputInsert: event => dispatch(actions.inputInsert(event.key)),
  moveCaret: event => dispatch(actions.moveCaret(event)),
}))(CommandLine);
