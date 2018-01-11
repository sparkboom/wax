// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
import * as Actions from './actions';
import * as AppActions from '../app/actions';
import * as Types from './types';
import * as AppTypes from '../app/types';
import type {CommandState} from './state';

// Types
type CommandReduxProps = CommandState;
type CommandDispatch = {
  executeCommand : Array<AppTypes.Command>=>void,
  setTokens : Array<Types.Token>=>void,
};
type Props = CommandConnectReduxProps & CommandDispatch;
type CommandConnectReduxProps = {command:CommandState}=>CommandReduxProps;
type CommandConnectDispatch = ((Actions.Union|AppActions.Union)=>void)=>CommandDispatch;

//

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
  executeCommand: commands => dispatch(AppActions.executeCommand(commands)),
  setTokens: tokens => dispatch(Actions.setTokens(tokens)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
