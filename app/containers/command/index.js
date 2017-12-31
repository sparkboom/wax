// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import * as appActions from '../app/actions';
import type {CommandState, CommandDispatch, CommandAction, State} from './types';

type PropsDispatch = {
  changeText : string=>void,
  changeSelection : (number, number)=>void,
  completePrediction : string=>void,
  executeCommand : mixed=>void,
  removeTokens : void=>void
};
type PropsValues = CommandState;
type Props = PropsValues & PropsDispatch;

class CommandLine extends React.Component<Props> {

  onExecuteActions = (actions=[]) => {

    let {executeCommand, removeTokens} = this.props;

    actions.forEach(action => {
      let cmd = {shape: action.args.shape};
      executeCommand(cmd);
    });
    removeTokens();
  };

  render() {
    let {text, selection, changeText, knownCommands, tokens, changeSelection, completePrediction} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          text={text}
          selection={selection}
          knownCommands={knownCommands}
          tokens={tokens}
          onTextChange={changeText}
          onSelectionChange={changeSelection}
          onCompletePrediction={completePrediction}
          onExecuteActions={this.onExecuteActions} />
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
  executeCommand: command => dispatch(appActions.executeCommand(command)),
  removeTokens: () => dispatch(actions.removeTokens()),
});

export default connect(connectProps, connectDispatch)(CommandLine);
