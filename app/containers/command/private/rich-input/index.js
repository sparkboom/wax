// @flow

import * as React from 'react';
import {withTheme} from 'styled-components';
import {InnerRichInput, HiddenInput} from './private';
import keycode from 'keycode';
import * as Selection from './lib/selection';
import * as Types from '../../types';
import * as Tokenizer from './lib/tokenizer';
import range from 'lodash/range';
import shortid from 'shortid';

// Types

export type Props = {
  context:Array<string>,
  tokens:Array<Types.Token>,
  methods:{[string]:Types.Method},
  onSetTokens: Array<Types.Token>=>void,
  onExecuteActions: Array<Types.Token>=>void,
  theme: any,
};

type State = {
  isFocussed : boolean
};

// Code

class RichInput extends React.Component<Props, State> {

  inputRef:?Selection.SelectableInputElement = null;
  selectedSuggestion:?Types.Suggestion = null;

  constructor(props : Props){
    super(props);
    this.state = {
      isFocussed : false
    };
  }

  setTokens = (text, tokens, selectionStart, selectionEnd) => this.props.onSetTokens([...Tokenizer.tokenize(text, tokens, selectionStart, selectionEnd)]);

  setFocus = (event:Event) => {
    if (document.activeElement === this.inputRef){
      return;
    }
    this.setState({isFocussed:true});
    this.inputRef && this.inputRef.focus();
    event.preventDefault();
  };

  onInputChange = () => {
    if (!this.inputRef){
      return;
    }
    const {tokens} = this.props;
    const {value, selectionStart, selectionEnd} = this.inputRef;
    this.setTokens(value, tokens, selectionStart, selectionEnd);
  };

  setSelection(tokenIndex, charIndex) {
    if (!this.inputRef){
      return;
    }

    const {tokens} = this.props;
    let index = range(0,tokenIndex)
        .map(i => tokens[i].text.length)
        .reduce((a,v) => a+v,0) + charIndex;

    this.inputRef && Selection.setCaretIndex(this.inputRef, index);
    this.inputRef && this.setTokens(this.inputRef.value, tokens, index, index);
  };

  onInputKeyDown = (event:KeyboardEvent) => {

    let code:string = keycode(event);
    let {tokens, onSetTokens, onExecuteActions} = this.props;

    if (code === 'enter' && !!this.selectedSuggestion){

      const method = this.props.methods[this.selectedSuggestion.methodKey];
      const newTokens = [...Tokenizer.completeSuggestion(tokens, method)];
      onSetTokens(newTokens);
    }
    else if (code === 'enter'){

      const commands = [...Tokenizer.commandsPriorToCaret(tokens)];
      if (commands.length>0){
        onSetTokens(tokens);
        onExecuteActions(commands);
      }
    }else if(code === 'esc'){

      const newTokens = [...Tokenizer.expandSelectCommandAndMergeTokens(tokens)];
      onSetTokens(newTokens);
    }
  };

  componentDidMount() {

    document.addEventListener('selectionchange', this.onInputChange );
  }

  componentWillUnmount(){

    document.removeEventListener('selectionchange', this.onInputChange );
  }

  render() {
    let {tokens, context, methods} = this.props;
    tokens = tokens || [];

    const tokensWithSuggestion = [...Tokenizer.tokenizeWithSuggestion(context, tokens, methods)] || [];

    const inputValue:string = tokens.reduce((a,v)=> a+v.text, '');
    const isFocussed = this.state.isFocussed;

    return (
      <div style={{width: '100%'}} onClick={this.setFocus} >
        <InnerRichInput
            isFocussed={isFocussed}
            tokens={tokensWithSuggestion}
            onTextSelect={(tokenIndex:number, charIndex:number) => this.setSelection(tokenIndex, charIndex)}
            onSelectSuggestion={suggestion=> this.selectedSuggestion = suggestion}
          />

        <HiddenInput
          innerRef={ref => this.inputRef = ref}
          onFocus={() => this.setState({isFocussed:true})}
          onBlur={() => this.setState({isFocussed:false})}
          onKeyDown={this.onInputKeyDown}
          onChange={() => this.onInputChange()}
          value={inputValue}  />

      </div>
    );
  }
}
export default withTheme(RichInput);
