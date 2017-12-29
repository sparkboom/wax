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

  render() {
    let {currentInput, caretIndex, setCaret, inputChange} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          caretIndex={caretIndex}
          value={currentInput}
          caretIndex={caretIndex}
          onTextChange={inputChange}
          onSelectCaretIndex={setCaret} />
      </RichInputContainer>
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
