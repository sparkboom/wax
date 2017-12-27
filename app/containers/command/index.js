import React from 'react';
import {connect} from 'react-redux';
import keycode from 'keycode';
import {InputContainer, CommandInput, RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

type Keycode = any => string;
type PropsDispatch = {
  inputInsert : any => void,
  inputSet : any => void,
  inputReplace : any => void,
  inputChange : any => void
  inputInsert : any => void,
  moveCaret : any => void,
  setCaret : any => void
};
type PropsValues = {
  currentInput : string,
  caretIndex : number,
};
type Props = PropsValues | PropsDispatch;

declare var document : Document;
declare var keycode : Keycode;

class CommandLine extends React.Component<PropsValues> {

  inputRef : ?HTMLInputElement = null;

  onKeyPress = (e : SyntheticKeyboardEvent) => {
    console.log('onKeyPress', e, e.key);
    if (keycode(e) === 'enter'){
      this.props.inputSet(e);
    }else if (!isEmpty(e.key)) {
      this.props.inputInsert(e);
    }else {
      console.log('Did not handle keypress event', keycode(e));
    }
  };

  onKeyDown = (e : SyntheticKeyboardEvent) => {
    console.log('onKeyDown', keycode(e),  e);
    if (e.currentTarget !== this.inputRef){
      return;
    }else if (keycode(e) === 'left' || keycode(e) === 'right'){
      this.props.moveCaret(keycode(e));
    }else if (keycode(e) === 'backspace' && this.props.caretIndex > 0){
      this.props.inputReplace('', this.props.caretIndex-1, 1);
    }else {
      console.debug('onKeyDown event not handled', e);
    }
  };

  onSelectCaretIndex = index => {
    this.props.setCaret(index);
  }

  componentWillMount() {
    document.addEventListener('keydown', ::this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', ::this.onKeyDown);
  }

  render() {
    let {currentInput, caretIndex} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          autoFocus
          inputRef={r => this.inputRef = r}
          value={currentInput}
          caretIndex={caretIndex}
          onSelectCaretIndex={this.onSelectCaretIndex}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress} />
      </RichInputContainer>
      <InputContainer>
        <CommandInput
          value={currentInput}
          onChange={this.props.inputChange} />
      </InputContainer>
    </div>);
  }
}

export default connect(state => ({
  currentInput: state.command.currentInput,
  caretIndex: state.command.caretIndex,
}), dispatch => ({
  inputChange: event => dispatch(actions.inputChange(event.currentTarget.value)),
  inputSet: event => dispatch(actions.inputSet(event.currentTarget.value)),
  inputReplace: (newValue, index, selectionLength) => dispatch(actions.inputReplace(newValue, index, selectionLength)),
  inputInsert: event => dispatch(actions.inputInsert(event.key)),
  moveCaret: event => dispatch(actions.moveCaret(event)),
  setCaret: index => dispatch(actions.setCaret(index)),
}))(CommandLine);
