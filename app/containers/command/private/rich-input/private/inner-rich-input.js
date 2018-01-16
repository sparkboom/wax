// @flow

import * as React from 'react';
import styled, {css} from 'styled-components';
import {Caret, InlineTextBlock, PredictionInlineTextBlock, TokenInlineTextBlock} from './';
import * as Types from '../../../types';
import get from 'lodash/get';

// Types

export type Props = {
  tokens: Array<Types.Token>,
  isFocussed:boolean,
  onTextSelect:(number, number)=>void,
  onSelectSuggestion:?Types.Suggestion=>void,
  theme:any,
};

type CommandTokenComponent = (Types.CommandToken, number) => React$Element<any>;
type CaretTokenComponent = number => React$Element<any>;
type SuggestionTokenComponent = (Types.SuggestionToken, number, ?Types.Suggestion) => React$Element<any>;
type TextTokenComponent = (Types.TextToken, number, (number,number)=>void) => React$Element<any>;

// Style

const FocussedBackgroundCss = css`background: rgba(136, 51, 85, 0.15);`;
const UnfocussedBackgroundCss = css`background: rgba(136, 51, 85, 0.05);`;
const HiddenCss = css`display: none;`;

const InnerRichInput = styled.pre`

  color: ${(p: Props) => p.theme.textColor};
  margin: 0;
  max-width: 100%;
  outline: 0;
  text-align: center;
  padding: 0.2em 0.2em;
  border-radius: 0.5em;

  white-space: pre-wrap;
  word-wrap: break-word;

  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: 100;

  overflow-y: scroll;

  ${ p => p.isFocussed? FocussedBackgroundCss:UnfocussedBackgroundCss }
  ${ p => p.isHidden && HiddenCss }
`;

// Code

const finTokenBlock = () => null;
const commandTokenBlock:CommandTokenComponent = (token, key) => (<TokenInlineTextBlock key={key} isSelected={token.isSelected}>{token.method.methodName}</TokenInlineTextBlock>);
const caretTokenBlock:CaretTokenComponent = key => (<Caret key={key} />);
const suggestionTokenBlock:SuggestionTokenComponent = (token, key, suggestion) => (<PredictionInlineTextBlock key={key} isSelected={token.isSelected}>{ suggestion && suggestion.predictionText }</PredictionInlineTextBlock>);
const textTokenBlock:TextTokenComponent = (token, key, onTextSelect) => (<InlineTextBlock key={key} isSelected={token.isSelected} onTextSelect={(charIndex:number) => onTextSelect(key, charIndex)}>{token.text}</InlineTextBlock>);

const getTokenBlock = (token, key, suggestion, onTextSelect) => {
  switch (token.type) {
    case 'FIN':
      return null;
    case 'COMMAND':
      return commandTokenBlock(token, key);
    case 'CARET':
      return caretTokenBlock(key);
    case 'SUGGESTION':
      return suggestionTokenBlock(token, key, suggestion);
    case 'TEXT':
      return textTokenBlock(token, key, onTextSelect);
    default:
      (token: empty)
      return null;
  }
};

const getSuggestions:Types.Token[]=>Types.Suggestion[] = tokens => {
  let suggestionToken = null;
  for(let token of tokens){
    if (token.type==='SUGGESTION'){
      suggestionToken = token;
    }
  }
  return !!suggestionToken && suggestionToken.suggestions || [];
};

export default (props:Props) => {
  const {tokens, isFocussed, onTextSelect, onSelectSuggestion} = props;
  let suggestions = getSuggestions(tokens);
  const suggestion = suggestions.length>0? suggestions[0] : null;
  onSelectSuggestion(suggestion);

  const inlineElements = tokens.map( (token ,key) => getTokenBlock(token ,key, suggestion, onTextSelect) );

  return (
    <InnerRichInput isFocussed={isFocussed} isHidden={(inlineElements.length===0)} >
      {inlineElements}
    </InnerRichInput>);
}
