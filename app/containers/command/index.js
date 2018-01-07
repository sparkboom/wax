// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import * as appActions from '../app/actions';
import type {CommandConnectDispatch, CommandConnectReduxProps, CommandReduxProps, CommandDispatch} from './types';

type Props = CommandConnectReduxProps & CommandDispatch;

class CommandLine extends React.Component<Props> {

  onExecuteActions = (actions=[]) => {

    const {executeCommand, tokens} = this.props;
    executeCommand(tokens);
  };

  render() {
    let {text, selection, changeText, tokens, changeSelection, createToken} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          text={text}
          selection={selection}
          tokens={tokens}
          onTextChange={changeText}
          onSelectionChange={changeSelection}
          onCreateToken={createToken}
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
  createToken: suggestion => dispatch(actions.createToken(suggestion)),
  executeCommand: commands => dispatch(appActions.executeCommand(commands)),
  removeTokens: () => dispatch(actions.removeTokens()),
});

export default connect(connectProps, connectDispatch)(CommandLine);
