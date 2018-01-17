// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer, ContextList} from './private';
import {currentContext, contextInterfaces} from './selectors';
import * as Actions from './actions';
import * as AppActions from '../app/actions';
import * as Types from './types';
import * as AppTypes from '../app/types';
import type {CommandState} from './state';

// Types
type CommandReduxProps = CommandState;
type CommandDispatch = {
  executeInstructions : Array<AppTypes.Instruction>=>void,
  setTokens : Array<Types.Token>=>void,
};
type Props = CommandConnectReduxProps & CommandDispatch;
type CommandConnectReduxProps = {command:CommandState}=>CommandReduxProps;
type CommandConnectDispatch = ((Actions.Union|AppActions.Union)=>void)=>CommandDispatch;

// Code

class CommandLine extends React.Component<Props> {

  render() {
    let {tokens, methods, currentContext, contextInterfaces, setTokens, executeInstructions} = this.props;
    return (
    <div>
      <ContextList contextInterfaces={contextInterfaces} />
      <RichInputContainer>

        <RichInput
          tokens={tokens}
          context={currentContext}
          methods={methods}
          onSetTokens={setTokens}
          onExecuteActions={executeInstructions}
         />
      </RichInputContainer>
    </div>);
  }
}

const connectProps:CommandConnectReduxProps = state => ({
  tokens: state.command.tokens,
  methods: state.command.methods,
  currentContext: currentContext(state),
  contextInterfaces: contextInterfaces(state),
});

const connectDispatch:CommandConnectDispatch = dispatch => ({
  executeInstructions: instructions => dispatch(AppActions.executeInstructions(instructions)),
  setTokens: tokens => dispatch(Actions.setTokens(tokens)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
