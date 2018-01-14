// @flow

import * as Interpreter from './exec';
import * as Types from '../../../types';

// Types

export type Tokenizer = Generator<Types.Token,void,void>;

// Code

const UNICODE_OBJECT_REPLACEMENT_CHARACTER = '\uFFFC';

/**
* Scans in character, by character through a string, yielding each one in turn.
* Information about its type is passed, and whether it is selected or not.
*
* A caret object is returned as well to help position it when the selection length is 0
*/
// @ $FlowFixMe
function* scanner(text:string, selectStart:number, selectEnd:number):Tokenizer{
  for(let i=0; i<=text.length; i++){

    if (selectStart===selectEnd && i===selectStart){
      yield {
        text: '',
        type: 'CARET',
        isSelected:true};
    }

    if (i<text.length){
      let ch = text[i];
      yield {
        text:ch,
        type:(ch===UNICODE_OBJECT_REPLACEMENT_CHARACTER? 'COMMAND':'TEXT'),
        isSelected:i>=selectStart && i<selectEnd
      };
    }
  }
  yield {
    type: 'FIN',
    text: '',
  };
}

/**
* tokenizes styled items in the input field.
*
*/
// $FlowFixMe
export function* tokenize(text:string, tokens:Array<Types.Token>, selectStart:number, selectEnd:number):Tokenizer{
  const currentCommandTokens = tokens.filter(t => t.type==='COMMAND');
  let token = null;
  for(let newScan of scanner(text, selectStart, selectEnd)){

    if(!token){
      token = newScan;
      continue;
    }

    if (token.type === newScan.type && token.isSelected === newScan.isSelected && token.type === 'TEXT' ){
      token.text += newScan.text;
      continue;
    }

    // if our current token is a command, yield it as it can only be 1 character.
    if (token.type === 'COMMAND'){
      let cmdToken = currentCommandTokens.shift();
      cmdToken.isSelected = token.isSelected;
      yield cmdToken;
      token = newScan;
      continue;
    }

    // if token change, in type or isSelected, then yield a token
    if (token.type !== newScan.type || token.isSelected !== newScan.isSelected){
      yield token;
      token = newScan;
      continue;
    }

    throw new Error(`Could not parse text`);
  }
  yield token;
}

//export function* tokenizeWithSuggestion(tokens:Array<Types.Token>):Tokenizer{
// $FlowFixMe
export function* tokenizeWithSuggestion(contextClasses, tokens = []){

  let prevTokens = [null, null];
  for(let token of tokens){
    if (tokens && (token.type==='TEXT' || token.type==='FIN')
          && prevTokens[1] && prevTokens[1].type==='CARET'
          && prevTokens[0] && prevTokens[0].type==='TEXT'){

      // if last 2 tokens was caret and text, and current is text,
      // we may be able to replace some forthcoming text with prediction
      let suggestions = [...contextClasses.map(c => Interpreter.predict(c, prevTokens[0].text))]
      console.log('suggestions', suggestions);
      suggestions = suggestions.length>0? suggestions[0]:[];
      let suggestionToken = {
        type: 'SUGGESTION',
        text: '',
        isSelected:false,
        ...suggestions,
      };
      yield suggestionToken;
    }

    yield token;
    prevTokens.shift();
    prevTokens.push(token);
  }
}

/**
*
*/
export function* mergeTextTokens(tokens:Array<Types.Token>):Tokenizer{

  let textToken = null
  for(let token of tokens){
    if (token.type === 'TEXT'){
      if (!textToken){
        textToken = token;
      } else {
        textToken.text += token.text;
      }
    } else {
      if (textToken){
        yield textToken;
        textToken = null;
      }
      yield token;
    }
  }

  if (textToken) {
    yield textToken;
  }
}
