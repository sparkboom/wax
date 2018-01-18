// @flow

import * as AutoComplete from './auto-complete';
import * as Types from '../../../types';
import shortid from 'shortid';

// Code

const UNICODE_OBJECT_REPLACEMENT_CHARACTER = '\uFFFC';

const CaretToken = {
  text: '',
  type: 'CARET',
  isSelected:true};

const FinToken = {
  text: '',
  type: 'FIN'};

const createSuggestionToken = suggestions => ({
  type: 'SUGGESTION',
  text: '',
  isSelected:false,
  suggestions,
});

const createCommandToken = (method:Types.Method) => ({
  type: 'COMMAND',
  text: UNICODE_OBJECT_REPLACEMENT_CHARACTER,
  method,
  commandKey: shortid.generate(),
  isSelected:false,
});

const createSelectedTextToken = text => ({
  type: 'TEXT',
  text,
  isSelected: true,
});

/**
* Scans in character, by character through a string, yielding each one in turn.
* Information about its type is passed, and whether it is selected or not.
*
* A caret object is returned as well to help position it when the selection length is 0
*/
// @ $FlowFixMe
function* scanner(text:string, selectStart:number, selectEnd:number):Iterable<Types.Token>{
  for(let i=0; i<=text.length; i++){

    if (selectStart===selectEnd && i===selectStart){
      yield CaretToken;
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
  yield FinToken;
}

/**
* Tokenizes styled items in the input field.
*
*/
export function* tokenize(text:string, tokens:Array<Types.Token>, selectStart:number, selectEnd:number):Generator<Types.Token,void,void>{
  const currentCommandTokens = ((tokens.filter(t => t.type==='COMMAND'):any[]):Types.CommandToken[]);

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
  if (!!token){
    yield token;
  }
}

export function* tokenizeWithSuggestion(context:string[], tokens:Types.Token[] =[], methodsByKey:{[string]:Types.Method} = {}):Iterable<Types.Token>{

  const isCaret = t => !!t && t.type==='CARET';
  const isText = t => !!t && t.type==='TEXT';
  const isAfterTextThenCaret = ts => isText(ts[0]) && isCaret(ts[1]);
  const doesNextTextTokenBeginWithSpace = t => isText(t) && (t.text.length===0 || t.text[0].match(/\s/)!==null );

  let prevTokens:Array<?Types.Token> = [null, null];
  for(let token of tokens){

    if (isAfterTextThenCaret(prevTokens) && prevTokens[0] && (token.type==='FIN' || doesNextTextTokenBeginWithSpace(token))){

      // if last 2 tokens was caret and text, and current is text,
      // we may be able to replace some forthcoming text with prediction
      let suggestions = [...AutoComplete.suggestGen(context, prevTokens[0].text)];
      console.log('suggestions', suggestions);

      //let suggestions = AutoComplete.suggest(context, prevTokens[0].text, methodsByKey);
      let suggestionToken = createSuggestionToken(suggestions);
      yield suggestionToken;
    }

    yield token;
    prevTokens.shift();
    prevTokens.push(token);
  }

  // shows when dot or alphanumeric shows must be whitespace or
  //
}

/**
*
*/
export function* mergeTextTokens(tokens:Iterable<Types.Token>):Iterable<Types.Token>{

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


export function* completeSuggestion(tokens:Iterable<Types.Token>, method:Types.Method):Generator<Types.Token, void, void>{

  let prevToken = null;
  for(let token of tokens){
    if(token.type === 'CARET'){
      const cmdToken:Types.CommandToken = createCommandToken(method);
      yield cmdToken;
    }else if(!!prevToken){
      yield prevToken;
    }
    prevToken = token;
  }
  if (prevToken){
    yield prevToken;
  }
}

export function* commandsPriorToCaret(tokens:Iterable<Types.Token>):Generator<Types.CommandToken, void, void>{

  let commands = [];
  for(let token of tokens){
    if (token.type === 'COMMAND'){
      commands.push(token);
    } else if (token.type === 'CARET'){
      yield* commands;
    }else {
      commands = [];
    }
  }
}

export function* expandSelectedCommandTokens(tokens:Iterable<Types.Token>):Iterable<Types.Token>{

  for(let token of tokens){
    if (token.type === 'COMMAND' && token.isSelected === true){
      yield createSelectedTextToken(`.${token.method.methodName}`);
    } else {
      yield token;
    }
  }
}

export function* expandSelectCommandAndMergeTokens(tokens:Array<Types.Token>):Generator<Types.Token, void, void> {

  yield*  mergeTextTokens(expandSelectedCommandTokens(tokens));
}
