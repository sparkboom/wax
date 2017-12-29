import React from 'react';
import {connect} from 'react-redux';
import keycode from 'keycode';
import {CommandInput, RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

type PropsDispatch = {
  inputChange : (event : SyntheticInputEvent ) => void,
  inputInsert : any => void,
  inputSet : any => void,
  inputReplace : any => void,
  moveCaret : any => void,
  setCaret : (index: number) => void,
};
type PropsValues = {
  currentInput : string,
  caretIndex : number,
};
type State = {
  command? : {
    currentInput : ?string,
    caretIndex : ?number,
  }
};

type Props = PropsValues | PropsDispatch;

declare var document : EventTarget;

class CommandLine extends React.Component<Props> {

  inputRef : ?HTMLInputElement = null;

  onKeyPress = (e : SyntheticKeyboardEvent<HTMLDivElement>)=> {
    console.log('onKeyPress', e, e.key);
    let code : string = keycode(e);
    if (code === 'enter'){
      this.props.inputSet(e);
    }else if (!isEmpty(e.key)) {
      this.props.inputInsert(e);
    }else {
      console.log('Did not handle keypress event', code);
    }
  };

  onKeyDown : KeyboardEventListener = (e : KeyboardEvent) => {
    let code : string = keycode(e);
    console.log('onKeyDown', code,  e, e.target, this.inputRef);
    if (e.target !== this.inputRef){
      return;
    }else if (code === 'left' || code === 'right'){
      this.props.moveCaret(code);
    }else if (code === 'backspace' && this.props.caretIndex > 0){
      this.props.inputReplace('', this.props.caretIndex-1, 1);
    }else {
      console.debug('onKeyDown event not handled', e);
    }
  };

  componentWillMount() {
    document.addEventListener('keydown', ::this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', ::this.onKeyDown);
  }

  render() {
    let {currentInput, caretIndex, setCaret} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          autoFocus
          inputRef={r => this.inputRef = r}
          value={currentInput}
          caretIndex={caretIndex}
          onSelectCaretIndex={setCaret}
          onKeyPress={this.onKeyPress} />
      </RichInputContainer>
      <CommandInput
        value={currentInput}
        onChange={this.props.inputChange} />
    </div>);
  }
}

export default connect((state : State) : PropsValues => ({
  currentInput: state.command.currentInput,
  caretIndex: state.command.caretIndex,
}), (dispatch : Dispatch) => ({
  inputChange: event => dispatch(actions.inputChange(event.currentTarget.value)),
  inputSet: event => dispatch(actions.inputSet(event.currentTarget.value)),
  inputReplace: (newValue, index, selectionLength) => dispatch(actions.inputReplace(newValue, index, selectionLength)),
  inputInsert: event => dispatch(actions.inputInsert(event.key)),
  moveCaret: event => dispatch(actions.moveCaret(event)),
  setCaret: index => dispatch(actions.setCaret(index)),
} : PropsDispatch))(CommandLine);
