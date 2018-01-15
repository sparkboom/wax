// @flow

import React from 'react';
import {connect} from 'react-redux';
import {RichInput, RichInputContainer} from './private';
import {getUniqueClasses} from './selectors';
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

//

class CommandLine extends React.Component<Props> {

  render() {
    let {tokens, setTokens, executeInstructions, selectedClasses} = this.props;
    return (
    <div>
      <RichInputContainer>
        <RichInput
          tokens={tokens}
          context={selectedClasses}
          onSetTokens={setTokens}
          onExecuteActions={executeInstructions}
         />
      </RichInputContainer>
    </div>);
  }
}

const connectProps:CommandConnectReduxProps = state => ({
  ...state.command,
  selectedClasses: null, //getUniqueClasses(state),
});

const connectDispatch:CommandConnectDispatch = dispatch => ({
  executeInstructions: instructions => dispatch(AppActions.executeInstructions(instructions)),
  setTokens: tokens => dispatch(Actions.setTokens(tokens)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
