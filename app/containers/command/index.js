// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
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
    let {tokens, setTokens, executeInstructions, currentContext, contextInterfaces} = this.props;
    return (
    <div>
      <div style={{position:'fixed', width:'100%', top: 0, height:'100px'}} >
        { `Interfaces: ${contextInterfaces && contextInterfaces.map( i => ` ${i.interfaceName} ` )}` }
      </div>
      <RichInputContainer>

        <RichInput
          tokens={tokens}
          context={currentContext}
          onSetTokens={setTokens}
          onExecuteActions={executeInstructions}
         />
      </RichInputContainer>
    </div>);
  }
}

const connectProps:CommandConnectReduxProps = state => ({
  ...state.command,
  currentContext: currentContext(state),
  contextInterfaces: contextInterfaces(state),
});

const connectDispatch:CommandConnectDispatch = dispatch => ({
  executeInstructions: instructions => dispatch(AppActions.executeInstructions(instructions)),
  setTokens: tokens => dispatch(Actions.setTokens(tokens)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
