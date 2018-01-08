// @flow

import * as React from 'react';
import {withTheme} from 'styled-components';
import {Caret, InnerRichInput, InlineTextBlock, SelectedInlineTextBlock, HiddenInput, PredictionInlineTextBlock, TokenInlineTextBlock} from './private';
import classNames from 'classnames';
//import keycode from 'keycode';
import * as Selection from './lib/selection';
import type {Props} from './types';
import {tokenize, tokenizeWithSuggestion} from './lib/tokenizer';
import range from 'lodash/range';

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




  //onInputKeyDown = (event:KeyboardEvent) => {

      // let {onRemoveToken, tokens, selection} = this.props;
      // let code:string = keycode(event);
      // if (code === 'backspace' && tokens.length>0 && selection.start === 0 && selection.length === 0){
      //   onRemoveToken([tokens.length-1]);
      // }
  //};

  //onInputKeyPress = (event:KeyboardEvent, suggestion) => {

    // let {onCreateToken, onExecuteActions, text, tokens} = this.props;
    // let code:string = keycode(event);
    // if (code === 'enter' && suggestion.matched){
    //   onCreateToken(suggestion);
    // } else if (code === 'enter' && text.length === 0 && tokens.length > 0 ){
    //   onExecuteActions(tokens);
    // }
  //};

  // onSelectionChange = event => {
  //   let input = this.inputRef;
  //   input && this.props.onSelectionChange(input.selectionStart, input.selectionEnd - input.selectionStart);
  // };

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
    console.log('tokens', tokens);
    console.log('tokensWithSuggestion', tokensWithSuggestion);
    const inlineElements = tokensWithSuggestion.map((t,i) => {
      return {
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

          onChange={() => this.onInputChange()}
          value={inputValue}  />
      </div>
    );
  }
}
export default withTheme(RichInput);

/*
onKeyPress={(event:any) => this.onInputKeyPress(event, suggestion)}
onKeyDown={this.onInputKeyDown}
*/
