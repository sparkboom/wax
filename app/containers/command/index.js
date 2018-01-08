// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
import * as actions from './actions';
import * as appActions from '../app/actions';
import type {CommandConnectDispatch, CommandConnectReduxProps, CommandReduxProps, CommandDispatch} from './types';

type Props = CommandConnectReduxProps & CommandDispatch;

class CommandLine extends React.Component<Props> {

  render() {
    let {tokens, setTokens, executeCommand} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          tokens={tokens}
          onSetTokens={setTokens}
          onExecuteActions={executeCommand}
         />
      </RichInputContainer>
    </div>);
  }
}

const connectProps:CommandConnectReduxProps = state => ({
  ...state.command
});

const connectDispatch:CommandConnectDispatch = dispatch => ({
  executeCommand: commands => dispatch(appActions.executeCommand(commands)),
  setTokens: tokens => dispatch(actions.setTokens(tokens)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
