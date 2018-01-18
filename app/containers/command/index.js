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
  inputChange:(?string,string,number,number)=>void,
  setSuggestion:?Types.Suggestion=>void,
};
type Props = CommandConnectReduxProps & CommandDispatch;
type CommandConnectReduxProps = {command:CommandState}=>CommandReduxProps;
type CommandConnectDispatch = ((Actions.Union|AppActions.Union)=>void)=>CommandDispatch;

// Code

class CommandLine extends React.Component<Props> {

  render() {
    let {tokens, contextInterfaces, inputChange, setSuggestion, suggestion} = this.props;
    return (
    <div>
      <ContextList contextInterfaces={contextInterfaces} />
      <RichInputContainer>

        <RichInput
          tokens={tokens}
          suggestion={suggestion}

          onInputChange={inputChange}
          onSetSuggestion={setSuggestion}
         />
      </RichInputContainer>
    </div>);
  }
}

const connectProps:CommandConnectReduxProps = state => ({
  tokens: state.command.tokens,
  suggestion: state.command.currentSuggestion,
  contextInterfaces: contextInterfaces(state),
});

const connectDispatch:CommandConnectDispatch = dispatch => ({
  inputChange: (key, text, selectStart, selectEnd) => dispatch(Actions.inputChange(key, text, selectStart, selectEnd)),
  setSuggestion: suggestion => dispatch(Actions.setSuggestion(suggestion)),
});

export default connect(connectProps, connectDispatch)(CommandLine);
