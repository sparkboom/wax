// @flow

import React from 'react';
import {connect} from 'react-redux';
import {CommandInput, RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import styled from 'styled-components';
import type {CommandState, CommandDispatch, CommandAction, State} from './types';

type PropsDispatch = {
  changeText : string=>void,
  changeSelection : (number, number)=>void,
  completePrediction : string=>void,
};
type PropsValues = CommandState;
type Props = PropsValues & PropsDispatch;

class CommandLine extends React.Component<Props> {

  render() {
    let {text, selection, changeText, knownCommands, changeSelection, completePrediction} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          text={text}
          selection={selection}
          knownCommands={knownCommands}
          onTextChange={changeText}
          onSelectionChange={changeSelection}
          onCompletePrediction={completePrediction} />
      </RichInputContainer>
    </div>);
  }
}


const connectProps:(State => PropsValues) = state => ({
  ...state.command
});

const connectDispatch:(CommandDispatch => PropsDispatch) = dispatch => ({
  changeText: newText => dispatch(actions.textChange(newText)),
  changeSelection: (start, length) => dispatch(actions.selectionChange(start, length)),
  completePrediction: prediction => dispatch(actions.completePrediction(prediction)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
