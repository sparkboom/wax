// @flow

import * as React from 'react';
import {withTheme} from 'styled-components';
import {Caret, InnerRichInput, InlineTextBlock, SelectedInlineTextBlock, HiddenInput, PredictionInlineTextBlock, TokenInlineTextBlock} from './private';
import classNames from 'classnames';
import keycode from 'keycode';
import * as Selection from './lib/selection';
import type {Props} from './types';
import {tokenize, tokenizeWithSuggestion} from './lib/tokenizer';
import range from 'lodash/range';
import shortid from 'shortid';

type State = {
  isFocussed : boolean
};

class RichInput extends React.Component<Props, State> {
  inputRef : ?Selection.SelectableInputElement = null;
  constructor(props : Props){
    super(props);
    this.state = {
      isFocussed : false
    };
  }

  setTokens = (text, tokens, selectionStart, selectionEnd) => this.props.onSetTokens([...tokenize(text, tokens, selectionStart, selectionEnd)]);

  setFocus = (event : Event) => {
    if (document.activeElement === this.inputRef){
      return;
    }
    this.setState({isFocussed:true});
    this.inputRef && this.inputRef.focus();
    event.preventDefault();
  };

  onInputChange = () => {
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

    Selection.setCaretIndex(this.inputRef, index)
    this.setTokens(this.inputRef.value, tokens, index, index);
  };

  onInputKeyPress = (event:KeyboardEvent, suggestion) => {

    let code:string = keycode(event);
    let {tokens, onSetTokens, onExecuteActions} = this.props;
    let caretTokenIndex = tokens.findIndex(t => t.type==='CARET');

    if (code === 'enter' && suggestion){
      tokens = [...tokens];
      tokens[caretTokenIndex-1] = {
        type: 'COMMAND',
        text: '©',
        command: suggestion.command,
        action: suggestion.action,
        key: shortid.generate(),
      };
      onSetTokens(tokens);
    }
    else if (code === 'enter' && caretTokenIndex>0){
      let i = caretTokenIndex;
      while(i>0 && tokens[i-1].type === 'COMMAND'){
        i--;
      }
      let commands = tokens.slice(i, caretTokenIndex);
      if (commands.length>0){
        commands.forEach(cmd => cmd.isExecuting = true)
        onSetTokens(tokens);
        onExecuteActions(commands);
      }
    }
  };

  componentDidMount() {

    document.addEventListener('selectionchange', this.onInputChange );
  }

  componentWillUnmount(){

    document.removeEventListener('selectionchange', this.onInputChange );
  }

  render() {
    const {tokens} = this.props;
    const innerRichInputClassName : string = classNames({
      focussed: this.state.isFocussed
    });

    const tokensWithSuggestion = [...tokenizeWithSuggestion(tokens)];
    const suggestion = tokensWithSuggestion.find(t => t.type === 'SUGGESTION');
    const inlineElements = tokensWithSuggestion.map((t,i) => {
      return {
        'FIN': null,
        'COMMAND': (<TokenInlineTextBlock key={i}>{t.command}</TokenInlineTextBlock>),
        'CARET': (<Caret key={i} />),
        'SUGGESTION': (<PredictionInlineTextBlock key={i}>{ t.prediction }</PredictionInlineTextBlock>),
        'TEXT': (<InlineTextBlock
                        key={i}
                        type={t.isSelected? 'SELECTION':'NORMAL'}
                        onTextSelect={(charIndex:number) => this.setSelection(i, charIndex)}>
                        {t.text}
                </InlineTextBlock>),
      }[t.type] || null;
    });

    const inputValue:string = tokens.reduce((a,v)=> a+v.text, '');

    return (
      <div style={{width: '100%'}} onClick={this.setFocus} >
        <InnerRichInput className={innerRichInputClassName}>
          {inlineElements}
        </InnerRichInput>

        <HiddenInput
          innerRef={ref => this.inputRef = ref}
          onFocus={() => this.setState({isFocussed:true})}
          onBlur={() => this.setState({isFocussed:false})}
          onKeyPress={(event:any) => this.onInputKeyPress(event, suggestion)}
          onChange={() => this.onInputChange()}
          value={inputValue}  />
      </div>
    );
  }
}
export default withTheme(RichInput);
