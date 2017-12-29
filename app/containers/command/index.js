import React from 'react';
import {connect} from 'react-redux';
import keycode from 'keycode';
import {CommandInput, RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

type PropsDispatch = {
  changeText : (event : SyntheticInputEvent ) => void,
  changeSelection : (start: number, length: number) => void,
};
type PropsValues = {
  text : string,
  selection : {
    start: number,
    length: number,
  },
};
type State = {
  command? : PropsValues
};

type Props = PropsValues | PropsDispatch;

declare var document : EventTarget;

class CommandLine extends React.Component<Props> {

  render() {
    let {text, selection, changeText, changeSelection} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          text={text}
          selection={selection}
          onTextChange={changeText}
          onSelectionChange={changeSelection} />
      </RichInputContainer>
    </div>);
  }
}

export default connect((state : State) : PropsValues => ({
  ...state.command
}), (dispatch : Dispatch) => ({
  changeText: event => dispatch(actions.textChange(event.currentTarget.value)),
  changeSelection: (start, length) => dispatch(actions.selectionChange(start, length)),
} : PropsDispatch))(CommandLine);
