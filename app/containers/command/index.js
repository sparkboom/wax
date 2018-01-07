// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import * as appActions from '../app/actions';
import type {CommandConnectDispatch, CommandConnectReduxProps, CommandProps, CommandReduxProps, CommandDispatch} from './types';

type Props = CommandProps & CommandConnectReduxProps & CommandDispatch;

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
    let {text, selection, interpreter, changeText, tokens, changeSelection, completePrediction} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          text={text}
          selection={selection}
          tokens={tokens}
          interpreter={interpreter}
          onTextChange={changeText}
          onSelectionChange={changeSelection}
          onCompletePrediction={completePrediction}
          onExecuteActions={this.onExecuteActions} />
      </RichInputContainer>
    </div>);
  }
}

const connectProps:CommandConnectReduxProps = state => ({
  ...state.command
});

const connectDispatch:CommandConnectDispatch = dispatch => ({
  changeText: newText => dispatch(actions.textChange(newText)),
  changeSelection: (start, length) => dispatch(actions.selectionChange(start, length)),
  completePrediction: prediction => dispatch(actions.completePrediction(prediction)),
  executeCommand: command => dispatch(appActions.executeCommand(command)),
  removeTokens: () => dispatch(actions.removeTokens()),
});

export default connect(connectProps, connectDispatch)(CommandLine);
